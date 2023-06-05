import React from 'react'
import style from './style.module.css'

const Card = ({nome, quantidadeProduto, unidadeMedida}) => {

  const [input, setInput] = React.useState(null)
  const [update, setUpdate] = React.useState(false)
  
  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const inputRef = React.useRef(null)
  let uppercase
  
  if(unidadeMedida){
    uppercase = unidadeMedida.toUpperCase()
  }

  const handleClick = () => {
    setUpdate(!update)
  }

  const handleAtt = () => {
  /*   transformTrue()
    alert('Pedido solicitado para Gerente de Logistica.')
    window.location.reload() */
  }


  return (
    <>
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
              <button onClick={handleAtt} className={style.card__button__editar}>
                Editar
              </button>
              
              <button onClick={handleAtt} className={style.card__button__excluir}>
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