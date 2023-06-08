import React from 'react'
import style from './style.module.css'
import api from '../../services/api'

const CardSolicit = ({horario, nome, quantidadeProduto, solicitado, unidadeMedida, merendeira, idEscola, _id, rt, entregue}) => {
  const [produtos, setProdutos] = React.useState(false)
  const inputRef = React.useRef(null)
  const [input, setInput] = React.useState(null)
  const [update, setUpdate] = React.useState(false)
  const [dataSchool, setDataSchool] = React.useState(false)
  
  let uppercase = unidadeMedida.toUpperCase()
  const date =  horario.split('T').at(0) 
  const hour =  horario.split('T').at(-1) 

  async function handleSchool(){
    await api.get(`/escolas/${idEscola}`)
      .then(({data}) => setDataSchool(data))
        .catch(error => console.log(error))
  }


  async function getProdutos(){
    await api.get('/produtos')
      .then(({data}) => setProdutos(data))
  }

  async function attTabelaProduto(){
    let ProdutoId = 0
    let quantidadeProdutoCalculado = 0

    if(produtos){
      
      for(let i = 0; i < produtos.length; i++){
       if(await(produtos && nome == produtos[i].nome)){
          ProdutoId = produtos[i]._id
          quantidadeProdutoCalculado = produtos[i].quantidadeProduto - quantidadeProduto
        }        
      } 
    }

    await api.put(`/mr/update/${ProdutoId}`, {
      quantidadeProduto: quantidadeProdutoCalculado
    }).then(({data}) => console.log(data.quantidadeProduto))
        .catch(e => console.log(e))
  }

  async function transformTrue(){
    await api.put(`/mr/${_id}/true`)
      .then(([data]) => console.log(data))
        .catch(error => console.log(error))
  }
  
  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleClick = () => {
    setUpdate(!update)
  }

  const handleAtt = (e) => {
    e.preventDefault()
    attTabelaProduto()
    transformTrue()
    alert('Almoxarifado atualizado com sucesso.')
    window.location.reload()
  }

  React.useEffect(() => {
    handleSchool()
    getProdutos()
  }, [])

  return (
    <> 
      {
        !entregue &&

        <button onClick={handleClick} className={style.card__container}>
          <div className={style.card__content}>
          <div className={`${style.card__textbox} ${style.card__password}`}>
              <input
                ref={inputRef}
                value={`${date} - ${hour}`}
                onChange={handleInput}
                id={nome}
                required
              />

              <label htmlFor={nome}>Dia e hora solicitado</label>
            </div>

            <div className={`${style.card__textbox} ${style.card__password}`}>
              <input
                ref={inputRef}
                value={nome}
                onChange={handleInput}
                id={nome}
                required
              />

              <label htmlFor={nome}>Nome Produto</label>
            </div>

            <div className={`${style.card__textbox} ${style.card__password}`}>
              <input
                ref={inputRef}
                value={quantidadeProduto}
                onChange={handleInput}
                id={nome}
                required
              />

              <label htmlFor={nome}>Quantidade Produto</label>
            </div>

            <div className={`${style.card__textbox} ${style.card__password}`}>
              <input
                ref={inputRef}
                value={uppercase}
                onChange={handleInput}
                id={nome}
                required
              />

              <label htmlFor={nome}>Unidade de Medida</label>
            </div>

            <div className={`${style.card__textbox} ${style.card__password}`}>
              <input
                ref={inputRef}
                value={merendeira}
                onChange={handleInput}
                id={merendeira}
                required
              />

              <label htmlFor={merendeira}>Merendeira</label>
            </div>

          { dataSchool && <div className={`${style.card__textbox} ${style.card__password}`}>
              <input
                ref={inputRef}
                value={dataSchool[0].nome}
                onChange={handleInput}
                id={dataSchool}
                required
              />

              <label htmlFor={dataSchool}>Escola</label>
            </div>}
          { 
            update &&
            <div className={style.card__button__updateRT}>
              <button onClick={handleAtt}>Atualizar Almoxarifado</button>
            </div>}
          </div>
        </button>
      }

    </>
  )
}

export default CardSolicit