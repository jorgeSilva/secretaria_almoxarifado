import React from 'react'
import style from './style.module.css'
import { ReactComponent as SVGClose } from '../../assets/iconClose.svg'
import api from '../../services/api'

const Modal = ({modal, setModal}) => {
  const url = document.URL.split("/").slice(-1)
  const [nome, setNome] = React.useState('')
  const [QTDP, setQTDP] = React.useState()
  const [unidade, setUnidade] = React.useState('')
  const [error, setError] = React.useState(false)
  const [user, setUser] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [pushloading, setPushLoading] = React.useState(false)
 
  const handleNome = (e) => {
    setNome(e.target.value)
  }

   const handleQTDP = (e) => {
    setQTDP(e.target.value)
  }

   const handleUnidade = (e) => {
    setUnidade(e.target.value)
  }

  const handlePost = (e) => {
    e.preventDefault()
    Save()
  }

  async function handleUser(){
    setLoading(true)

    const {data} = await api.get(`/usuario/${url}`)

    try{
      setLoading(false)
      setUser(data)
    }catch(e){
      console.log(e);
    }
  }

  async function Save(){
    if(!nome){
      alert('Produto precisa ser nomeado.')
    }else if(!QTDP){
      alert('Precisa ser informado a quantidade.')
    }else if(!unidade){
      alert('Precisa ser informado a unidade de medida.')
    }

    setPushLoading(true)
    await api.post('/licitacao', {
      nome,
      quantidadeProduto: QTDP,
      unidadeMedida: unidade,
      quantidadeProdutoENV: 0,
      secretaria: user.secretaria
    }).then(() => {
      setPushLoading(false)
        alert('Pedido cadastrado com sucesso.')
        window.location.reload()
      })
        .catch(error => {
          setPushLoading(false)
          setError(error.response.data.error)
        })
  }

  const handleModal = () => {
    setModal(!modal)
  }  

  React.useEffect(() => {
    handleUser()
  }, [])
  
  return (
    <>
    <section className={style.modal__container}>
      <h1 className={style.modal__title}>Informe os dados do produto.</h1>

      <section className={style.modal__content}>
        <>
          <div className={style.card__container}>
          {
            loading ? 
            <section className={style.body__loading}>
              <div className={style.body__spinner}>
                <div className={style.spinner}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </section>
            :
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
                CADASTRAR
              </button>
              {
                error && <p className={style.modal__p__error}>{error}</p>
              }{
                pushloading && 
                  <p className={style.modal__loading}>Enviando...</p> 
                }
            </div>
          }
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