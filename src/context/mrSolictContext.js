import React from "react";
import api from "../services/api";
import { getDate, getMinutes, getMonth } from "date-fns";

const SolictContext = React.createContext()

function SolicitProvider({children}){
  const [nome, setNome] = React.useState('')
  const [QTDP, setQTDP] = React.useState('')
  const [unidade, setUnidade] = React.useState('')
  const [url, setUrl] = React.useState('')
  const [error, setError] = React.useState(false)
  const [user, setUser] = React.useState(false)
  const [produto, setProduto] = React.useState(false)

  async function getProdutos(){
    await api.get(`/produtos`)
        .then(({data}) => setProduto(data))
          .catch(e => console.log(e))
  }

  const handleNome = (e) => {
    setNome(e.target.value)
   /*  if(produto){
      produto.forEach()
    } */
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

  async function save() {
    if(!nome){
      return alert('Produto precisa ser nomeado.')
    }else if(!QTDP){
      return alert('Precisa ser informado a quantidade.')
    }else if(!unidade){
      return alert('Precisa ser informado a unidade de medida.')
    }

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
                    horario:  `${String(hora.getDate())}/${String(hora.getMonth())}/${hora.getFullYear()}T${hora.getHours()}:${String(hora.getMinutes())}`
                  }).then(() => {
                    alert('Solicitação enviada com sucesso.')
                    window.location.reload()
                  })
                  .catch(error => setError(error.response.data.error))
                }else{
                  setError(`Não foi encontrado produto: ${nome}`)
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
    getProdutos()
  }, [])

  return(
    <SolictContext.Provider value={
      {
        nome,
        QTDP, 
        unidade, 
        error, 
        handleNome, 
        handleQTDP, 
        handleUnidade, 
        handleUrl, 
        handleSubmit
      }
    }>
      {children}
    </SolictContext.Provider>
  )
}

export { SolictContext, SolicitProvider}