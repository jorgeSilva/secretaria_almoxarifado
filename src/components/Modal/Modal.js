import React from 'react'
import style from './style.module.css'
import { CreateContext } from '../../context/createContext'
import { ReactComponent as SVGClose } from '../../assets/iconClose.svg'

const Modal = ({modal, setModal}) => {
  const [data, setData] = React.useState(null)
  const {
    nome, 
    QTDP,
    unidade,
    error,
    handleNome,
    handleQTDP,
    handleUnidade,
    handlePost
  }  = React.useContext(CreateContext)

  const handleModal = () => {
    setModal(!modal)
  }  

  React.useEffect(() => {
  }, [])
  
  return (
    <>
    <section className={style.modal__container}>
      <h1 className={style.modal__title}>Informe os dados do produto.</h1>

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

            <button onClick={handlePost} className={style.modal__button__save}>
              Cadastrar
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