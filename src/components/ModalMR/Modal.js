import React from 'react'
import style from './style.module.css'
import { SolictContext } from '../../context/mrSolictContext'

const Modal = () => {
  const {
    nome, 
    QTDP,
    unidade,
    error,
    handleNome,
    handleQTDP,
    handleUnidade,
    handleSubmit

  } = React.useContext(SolictContext)

  React.useEffect(() => {
  }, [])
  
  return (
    <>
    <section className={style.modal__container}>
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

            <button onClick={handleSubmit} className={style.modal__button__save}>
              SOLICITAR
            </button>

            {
              error && <p className={style.modal__p__error}>{error}</p>
            }
          </div>
        </div>
      </>
      </section>
    </section>

    </>
  )
}

export default Modal