import React from 'react'
import Password from '../../components/Input/Password/Password'
import Email from '../../components/Input/Email/Email'
import style from './style.module.css'
import img from '../../assets/undraw_engineering_team_a7n2 1.svg'
import { Context } from '../../context/authContext'

const Login = () => {

  const {
    handleLogin, 
    handleChangeEmail, 
    handleChangePassword,
    error
  } = React.useContext(Context)  

  document.title = 'Merenda Escolar | Login'
  
  return (
    <>
      <section className={style.body__login}>
        <div className={style.body_background}>
          <div className={style.body__background_one}></div>
          <div className={style.body__background_two}></div>
          <div className={style.body__background_tree}></div>
        </div>

        <div className={style.body__title}>
          <h1>Faça parte de um ambiente mais ágil</h1>
        </div>
        
        <section className={style.body__content}>
          <h2>Login com email e senha</h2>
          <p>Aquele que desponibilizamos à você</p>
          <div className={style.body__form}>
            <form>
              <>
                <Email onChange={handleChangeEmail} type={'text'} id={'email__input'} />
                <Password onChange={handleChangePassword} id={'password__input'}/>
                <button className={style.body__button} onClick={handleLogin}>Entrar</button>
                {
                  error && 
                  <p className={style.login__p__error}>{error}</p>
                }
              </>
            </form>

            <div className={style.body__img}>
              <img src={img} alt='Imagem'/>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default Login