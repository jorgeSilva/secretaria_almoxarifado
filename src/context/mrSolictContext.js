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
  const [produtos, setProdutos] = React.useState(false)

  const handleNome = (e) => {
    setNome(e.target.value)
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

  async function getProdutos(){
    await api.get('/produtos')
      .then(({data}) => setProdutos(data))
        .catch(error => setError(error))
  }

  async function save() {
    if(!nome){
      return alert('Produto precisa ser nomeado.')
    }else if(!QTDP){
      return alert('Precisa ser informado a quantidade.')
    }else if(!unidade){
      return alert('Precisa ser informado a unidade de medida.')
    }

    let hora = new Date()

    let ProdutoId = 0

    if(produtos){
      for(let i = 0; i < produtos.length; i++){
        if(await(produtos && nome == produtos[i].nome)){
          ProdutoId = produtos[i]._id
        }
      }
    }

    console.log(ProdutoId);
    
    await api.post('/mr', {
      nome: nome,
      quantidadeProduto: QTDP,
      unidadeMedida: unidade,
      merendeira: url,
      produto: ProdutoId,
      horario:  `${String(hora.getDate() < 10 ? String('0'+hora.getDate()): getDate())}/${String(hora.getMonth() < 10 ? String('0'+hora.getMonth()): getMonth())}/${hora.getFullYear()}T${hora.getHours()}:${String(hora.getMinutes() < 10 ? String('0'+hora.getMinutes()): hora.getMinutes())}`
    }).then(() => {
      alert('Solicitação enviada com sucesso.')
      window.location.reload()
    }).catch(error => setError(error.response.data.msgError))         
  }

  React.useEffect(() => {
    handleUrl()
    getProdutos()
  }, [])

  return(
    <SolictContext.Provider value={{nome, QTDP, unidade, error, handleNome, handleQTDP, handleUnidade, handleUrl, handleSubmit}} >
      {children}
    </SolictContext.Provider>
  )
}

export { SolictContext, SolicitProvider}