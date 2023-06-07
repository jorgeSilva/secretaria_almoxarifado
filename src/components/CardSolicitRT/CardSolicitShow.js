import React from 'react'
import style from './style.module.css'
import api from '../../services/api'

const CardSolicit = ({horario, nome, quantidadeProduto, solicitado, unidadeMedida, merendeira, idEscola, _id, rt, entregue, totalProduto}) => {
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

  const handleClick = () => {
    setUpdate(!update)
  }

  React.useEffect(() => {
    handleSchool()
  }, [])

  return (
    <>
      <section className={style.card__container}>
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
              value={totalProduto}
              onChange={handleInput}
              id={totalProduto}
              required
            />

            <label htmlFor={nome}>Produtos no almoxarifado</label>
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

          { 
            dataSchool && 
            <div className={`${style.card__textbox} ${style.card__password}`}>
              <input
                ref={inputRef}
                value={dataSchool[0].nome}
                onChange={handleInput}
                id={dataSchool}
                required
              />

              <label htmlFor={dataSchool}>Escola</label>
            </div>
          }

          <div className={`${style.card__textbox} ${style.card__password}`}>
            <input
              ref={inputRef}
              value={rt == true ? 'Aprovada pela RT': 'Não aprovada pela RT'}
              onChange={handleInput}
              id={nome}
              required
            />

            <label htmlFor={String(rt)}>Solicitado para Nutricionista</label>
          </div>

          <div className={`${style.card__textbox} ${style.card__password}`}>
            <input
              ref={inputRef}
              value={solicitado == true ? 'Aprovada pela GL': 'Não aprovada pela GL'}
              onChange={handleInput}
              id={nome}
              required
            />

            <label htmlFor={String(solicitado)}>Gerente de Logistica</label>
          </div>
        </div>
      </section>
    </>
  )
}

export default CardSolicit