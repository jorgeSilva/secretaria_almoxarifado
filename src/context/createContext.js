import React from "react";
import api from "../services/api";

const CreateContext = React.createContext()

function ProdutoProvider({children}){
  const [nome, setNome] = React.useState('')
  const [QTDP, setQTDP] = React.useState()
  const [unidade, setUnidade] = React.useState('')
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

  const handlePost = (e) => {
    e.preventDefault()
    Save()
  }

  async function Save(){
    if(!nome){
      alert('Produto precisa ser nomeado.')
    }else if(!QTDP){
      alert('Precisa ser informado a quantidade.')
    }else if(!unidade){
      alert('Precisa ser informado a unidade de medida.')
    }

    await api.post('/produto', {
      nome,
      quantidadeProduto: QTDP,
      unidadeMedida: unidade
  }).then(() => window.location.reload()  )
        .catch(error => setError(error.response.data.error))
  }

  React.useEffect(() => {
  }, [])

  return (
    <CreateContext.Provider value={{nome, QTDP, unidade, error, handleNome, handleQTDP, handleUnidade, handlePost}}>
      {children}
    </CreateContext.Provider>
  )
}

export {CreateContext, ProdutoProvider }