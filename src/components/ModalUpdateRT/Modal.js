import React from 'react'
import style from './style.module.css'
import api from '../../services/api'
import { ReactComponent as SVGClose } from '../../assets/iconClose.svg'

const Modal = ({modal, setModal, name, _id, quantidadeProduto, unidadeMedida}) => {
/* ---------------------- Rotas da API --------------------------- */

console.log(name, quantidadeProduto, unidadeMedida);

async function updateProduto(){
  await api.put(`/licitacao/produto/${_id}`, {
    quantidadeProduto: QTDP
  }).then(() => {
    alert('Dados do produto atualizados com sucesso.')
    window.location.reload()
  })
  .catch(e => setError(e.response.data.error))
}

/* ---------------------- Estados para o front end ------------------- */

  const handleUpdate = () => {
    updateProduto()
  }

  const [nome, setNome] = React.useState(name)
  const [QTDP, setQTDP] = React.useState(quantidadeProduto)
  const [unidade, setUnidade] = React.useState(unidadeMedida)
  const [error, setError] = React.useState(false)

  const handleNome = (e) => {
    setNome(e.target.value)
  }

   const handleQTDP = (e) => {
    setQTDP(e.target.value)
  }

   const handleUnidade = (e) => {
    setUnidade(e.target.value)
  }

  const handleModal = () => {
    setModal(!modal)
  }  

  React.useEffect(() => {
  }, [])
  
  return (
    <>
    <section className={style.modal__container}>
      <h1 className={style.modal__title}>Informe os dados aaaaa produto.</h1>

      <section className={style.modal__content}>
        <>
        <div className={style.card__container}>
          <div className={style.card__content}>
            <div className={`${style.card__textbox} ${style.card__password}`}>
              <input
                value={nome}
                onChange={handleNome}
                id={nome}
                required
              />

              <label htmlFor={nome}>Nome Produto</label>
            </div>

            <div className={`${style.card__textbox} ${style.card__password}`}>
              <input
                value={QTDP}
                onChange={handleQTDP}
                id={QTDP}
                required
              />

              <label htmlFor={QTDP}>Quantidade Produto</label>
            </div>

            <div className={`${style.card__textbox} ${style.card__password}`}>
              <input
                value={unidade}
                onChange={handleUnidade}
                id={unidade}
                required
              />

              <label htmlFor={unidade}>Unidade de Medida</label>
            </div>

            <button onClick={handleUpdate} className={style.modal__button__save}>
              Atualizar
            </button>
            {
              error && <p className={style.modal__p__error}>{error}</p>
            }
          </div>
        </div>
      </>

        <button onClick={handleModal} className={style.modal__button_close}>
          <SVGClose/>
        </button>
      </section>
    </section>

    </>
  )
}

export default Modal