import React from 'react'
import style from './style.module.css'
import { SolictContext } from '../../context/mrSolictContext'
import api from '../../services/api'

const Modal = ({data}) => {
  const [nome, setNome] = React.useState('')
  const [QTDP, setQTDP] = React.useState('')
  const [unidade, setUnidade] = React.useState('')
  const [url, setUrl] = React.useState('')
  const [error, setError] = React.useState(false)
  const [user, setUser] = React.useState(false)
  const [produto, setProduto] = React.useState(false)
  const [filterProdutos, setFilterProdutos] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  async function getProdutos(){
    setLoading(true)
    await api.get(`/secretaria/produtos/${data.secretaria}`)
        .then(({data}) => {
          setLoading(false)
          setProduto(data)
        })
          .catch(e => console.log(e))
  }

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


  const handleUrl = (e) => {
    setUrl(String(document.URL.split("/").slice(-1)))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    save()
  }

  console.log(nome);

  async function save() {
    if(!nome){
      return alert('Produto precisa ser nomeado.')
    }else if(!QTDP){
      return alert('Precisa ser informado a quantidade.')
    }else if(!unidade){
      return alert('Precisa ser informado a unidade de medida.')
    }

    setLoading(true)
    const {data} = await api.get(`/usuario/${url}`)

    try{
      setUser(data)

      if(data){
        await api.get(`/secretaria/produtos/${data.secretaria}`)
          .then(({data}) => {
            if(data){
              for(let i = 0; i < data.length; i++){
                if(data && nome == data[i].nome){
                  let hora = new Date()

                  api.post('/mr', {
                    nome: nome,
                    quantidadeProduto: QTDP,
                    unidadeMedida: unidade,
                    merendeira: url,
                    produto: data[i]._id,
                    secretaria: data[i].secretaria,
                    horario:  `${String(hora.getDate())}/${String(hora.getMonth()+1)}/${hora.getFullYear()}T${hora.getHours()}:${String(hora.getMinutes())}`
                  }).then(() => {
                    setLoading(false)
                    alert('Solicitação enviada com sucesso.')
                    window.location.reload()
                  })
                  .catch(error => setError(error.response.data.error))
                }
              }
            }
          }
        )
      }
    }catch(e){
      setError(e.response.data.error)
    }
  }

  React.useEffect(() => {
    handleUrl()
    if(data){
      getProdutos()
    }
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
                className={style.input_nome}
              />

              <label htmlFor={nome}>Nome Produto</label>
              {
                filterProdutos.length != 0 &&
                <div className={style.card__modal__list__content}>
                  {
                    filterProdutos.map(item => 
                      <p key={item._id}>
                        {`${item.nome} ${item.quantidadeProduto} ${item.unidadeMedida} no almoxarifado`}
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

            <button onClick={handleSubmit} className={style.modal__button__save}>
              SOLICITAR
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
      </section>
    </section>

    </>
  )
}

export default Modal