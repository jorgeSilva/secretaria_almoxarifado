import React from 'react'
import style from './style.module.css'
import { ReactComponent as SVGClose } from '../../assets/iconClose.svg'
import api from '../../services/api'

const Modal = ({data, modal, setModal}) => {
  const url = document.URL.split("/").slice(-1)
  const [nome, setNome] = React.useState('')
  const [QTDP, setQTDP] = React.useState()
  const [unidade, setUnidade] = React.useState('')
  const [error, setError] = React.useState(false)
  const [user, setUser] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [produto, setProduto] = React.useState(false)
  const [filterProdutos, setFilterProdutos] = React.useState([])

  const handleNome = (e) => {
    setNome(e.target.value)
    const search = e.target.value
    if(produto){
      const newFilter = produto.filter((value) => {
        return value.nome.toLowerCase().includes(search.toLowerCase())
        setUnidade(value.unidadeMedida)
      })

      if(search == ""){
        setFilterProdutos([])
      }else{
        setFilterProdutos(newFilter)
      }
    }
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

  async function getProdutos(){
    setLoading(true)
    await api.get(`/licitacao/produtos/${data}`)
        .then(({data}) => {
          setLoading(false)
          setProduto(data)
        })
          .catch(e => console.log(e))
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
      return alert('Produto precisa ser nomeado.')
    }else if(!QTDP){
      return alert('Precisa ser informado a quantidade.')
    }else if(!unidade){
      return alert('Precisa ser informado a unidade de medida.')
    }

    setLoading(true)
    await api.get(`/licitacao/produtos/${user.secretaria}`)
      .then(({data}) => {
        for(let i = 0; i < data.length; i++){
          if(data && nome == data[i].nome){
            return (
              api.post('/produto', {
                nome,
                quantidadeProduto: QTDP,
                unidadeMedida: unidade,
                secretaria: user.secretaria,
                tempLicitacao: data[i]._id 
              }).then(() => {
                setLoading(false)
                setError(false)
                alert('Pedido cadastrado com sucesso.')
                window.location.reload()
              })
              .catch(error => {
                setLoading(false)
                setError(error.response.data.error)
              })
            )
          }else if(data && nome != data[i].nome){
            setError('Produto não encontrado.')
          }
          setLoading(false)
        }
      }).catch(e => console.log(e))

    /*  */
  }

  const handleModal = () => {
    setModal(!modal)
  }

  React.useEffect(() => {
    handleUser()
    if(data){
      getProdutos()
    }
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
                className={style.input_nome}
              />

              <label htmlFor={nome}>Nome Produto</label>
              {
                filterProdutos.length != 0 &&
                <div className={style.card__modal__list__content}>
                  {
                    filterProdutos.map(item => 
                      <p key={item._id}>
                        {`${item.nome} ${item.quantidadeProduto} ${item.unidadeMedida} na licitação`}
                      </p>
                   )
                  }
                </div>
              }
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
              loading && 
                <p className={style.modal__loading}>Enviando...</p> 
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