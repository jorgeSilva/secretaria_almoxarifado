import React from 'react'
import style from './style.module.css'

const Card = ({nome, quantidadeProduto, unidadeMedida}) => {

  const [input, setInput] = React.useState(null)
  
  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const inputRef = React.useRef(null)
  let uppercase
  
  if(unidadeMedida){
    uppercase = unidadeMedida.toUpperCase()
  }

  return (
    <>
      <div className={style.card__container}>
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
        </div>
      </div>
    </>
  )
}

export default Card