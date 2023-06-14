import React from 'react'
import style from './style.module.css'
import ModalUpdateRT from '../ModalUpdateRT/Modal'
import api from '../../services/api'

const Card = ({nome, quantidadeProduto, unidadeMedida, _id}) => {
  /* ---------------------- Rotas da API --------------------------- */
  async function destroy(){
    await api.delete(`/licitacao/produtos/${_id}`)
  }

  /* ---------------------- Estados para o front end ------------------- */

  const [input, setInput] = React.useState(null)
  const [update, setUpdate] = React.useState(false)
  const [id, setID] = React.useState(false)
  const [modal, setModal] = React.useState(false)

  const inputRef = React.useRef(null)
  let uppercase
  
  if(unidadeMedida){
    uppercase = unidadeMedida.toUpperCase()
  }

  const handleClick = () => {
    setUpdate(!update)
    setID(_id)
  }

    const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleModal = () => {
    setModal(!modal)
  }

  const handleExcluir = () => {
    const res = window.confirm('Deseja realmente remover este produto?')

    if(res == true){
      destroy()
      alert('Produto removido com sucesso.')
      window.location.reload()
    }
  }

  React.useEffect(() => {
  }, [])

  return (
    <>
      {
        modal 
          && 
        <div className={style.body__modal__post} >
          <div className={style.body__modal__container}>
            <ModalUpdateRT
              modal={modal}
              setModal={setModal} 
              _id={id}
              name={nome}
              quantidadeProduto={quantidadeProduto}
              unidadeMedida={unidadeMedida}/>
          </div>
        </div>
      }


      <button onClick={handleClick} className={style.card__container}>
        <div className={style.card__content}>
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

          { 
            update &&
            <div className={style.card__button__updateRT}>
              <button onClick={handleModal} className={style.card__button__editar}>
                Editar
              </button>
              
              <button onClick={handleExcluir} className={style.card__button__excluir}>
                Excluir
              </button>
            </div>
          }
        </div>
      </button>
    </>
  )
}

export default Card