import React from "react";
import api from '../services/api'

const Context = React.createContext()

function AuthProvider({children}){
  const [authenticated, setAuthenticated] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const [email, setValueEmail] = React.useState('') 
  const [password, setValuePassword] = React.useState('') 

  const handleChangeEmail = (e) =>{
    setValueEmail(e.target.value)
  }

  const handleChangePassword = (e) =>{
    setValuePassword(e.target.value)
  }
   
  async function handleLogin(event){
    event.preventDefault()
    if(!email){
      return alert('É necessário o email.')
    }else if(!password){
      return alert('É necessário a senha.')
    }

    await api.post('/usuario/login', {
      email,
      password
    }).then(({data}) => {
      localStorage.setItem('token', JSON.stringify(data.token))
      api.defaults.headers.Authorization = `Bearer ${data.token}`
      setAuthenticated(true)
      
      const patamar = data.user.email.split('_')[0]
      const id = data.user._id

      window.location.href = `/${patamar}/${id}`
    }).catch(e => {
      setError(e.response.data.error);
    })
  } 

  function handleLogout(){
    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    alert("Você deixou esta conta")
    window.location.reload()
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token')

    if(token){
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }

    setLoading(false)
  }, [])

  return (
    <Context.Provider value={{loading, authenticated, handleLogin, handleChangeEmail, handleChangePassword, handleLogout, error}}>
      {children}
    </Context.Provider>
  )
}

export { Context, AuthProvider }