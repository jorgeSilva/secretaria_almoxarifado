import React from 'react'
import style from './style.module.css'
import iconPass from '../../../assets/iconPassword.svg'
import eye from '../../../assets/eye-fill.svg'
import eyeLock from '../../../assets/eye-slash-fill.svg'

const Password = ({value, onChange, id}) => {
  const inputRef = React.useRef(null)
  const [showPassword, setShowPassword] = React.useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleToggleShowPassword = () => {
    inputRef.current?.focus()
    toggleShowPassword()
  }

  return (
    <div className={`${style.textbox} ${style.password}`}>
      <input
        ref={inputRef}
        type={ showPassword ? 'text': 'password'}
        value={value}
        onChange={onChange}
        id={id}
        required
      />

      <label htmlFor={id}>Senha</label>
      <span><img src={iconPass}/></span>
      <button type='button' onClick={handleToggleShowPassword}>
        <span>
          {showPassword ? <img src={eye} /> : <img src={eyeLock}/>}
        </span>
      </button>
    </div>
  )
}

export default Password