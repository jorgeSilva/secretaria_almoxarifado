import React from 'react'
import style from './style.module.css'
import api from '../../services/api'
import Modal from '../ModalUpdateSolicit/Modal'

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
  const [modal, setModal] = React.useState(false)

  async function transformTrue(){
    await api.put(`/rt/${_id}/true`)
      .then(r => console.log(r))
        .catch(e => console.log(e))
  }

  async function transformFalse(){
    await api.put(`/rt/${_id}/false`)
      .then(() => {
        api.delete(`/produto/solicitado/${_id}`)
          .then(() => {
            alert('Pedido excluido com sucesso.')
            window.location.reload()
          })
      })
        .catch(e => console.log(e))
  }

  const handleClick = () => {
    setUpdate(!update)
  }

  const handleModal = () => {
    setModal(!modal)
  }

  const handleAtt = () => {
    transformTrue()
    alert('Pedido solicitado para Gerente de Logistica.')
    window.location.reload()
  }

  React.useEffect(() => {
    handleSchool()
  }, [])

  return (
    <>
      {
        modal 
          && 
        <div className={style.body__modal__post} >
          <div className={style.body__modal__container}>
            <Modal 
              modal={modal}
              setModal={setModal} 
              _id={_id}
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
            <button onClick={handleAtt}>Acionar Gerente de Logistica</button>
            <button onClick={handleModal}>Editar Solicitação</button>
            <button onClick={transformFalse}>Excluir Solicitação</button>
          </div>}
        </div>
      </button>
    </>
  )
}

export default CardSolicit