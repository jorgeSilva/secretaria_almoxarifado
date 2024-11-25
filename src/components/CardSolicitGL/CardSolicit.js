import React from 'react'
import style from './style.module.css'
import api from '../../services/api'

const CardSolicit = ({horario, nome, quantidadeProduto, solicitado, unidadeMedida, merendeira, idEscola, _id, rt}) => {
  const [dataSchool, setDataSchool] = React.useState(false)

  async function handleSchool(){
    await api.get(`/escolas/${idEscola}`)
      .then(({data}) => setDataSchool(data))
        .catch(error => console.log(error))
  }

  const inputRef = React.useRef(null)
  let uppercase = unidadeMedida.toUpperCase()
  const [input, setInput] = React.useState(null)

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const date =  horario.split('T').at(0)
  const hour =  horario.split('T').at(-1)

  const [update, setUpdate] = React.useState(false)

  async function transformTrue(){
    await api.put(`/gl/${_id}/true`)
      .then(r => console.log(r))
        .catch(e => console.log(e))
  }

  async function transformFalse(){
    await api.put(`/rt/${_id}/false`)
      .then(() => {
        alert('Pedido retornado à nutricionista.')
        window.location.reload()
      })
        .catch(e => console.log(e))
  }

  const handleClick = () => {
    setUpdate(!update)
  }

  const handleAtt = () => {
    transformTrue()
    alert('Pedido solicitado enviado para escola informada.')
    window.location.reload()
  }

  React.useEffect(() => {
    handleSchool()
  }, [])

  return (
    <> 
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
            <button onClick={handleAtt}>Enviar para escola</button>
            <button onClick={transformFalse}>Devolver para Nutricionista</button>
          </div>}
        </div>
      </button>
    </>
  )
}

export default CardSolicit