import React from 'react'
import style from './style.module.css'
import iconEmail from '../../../assets/iconEmail.svg'
import iconPass from '../../../assets/iconPassword.svg'
import eye from '../../../assets/eye-fill.svg'
import eyeLock from '../../../assets/eye-slash-fill.svg'


const Email = ({value, onChange, type, id}) => {
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
        type={type}
        value={value}
        onChange={onChange}
        id={id}
        required
      />

      <label htmlFor={id}>Email</label>
      <span><img src={iconEmail} className={style.email__icon}/></span>
      <button type='button' onClick={handleToggleShowPassword}>
        <span>
          {showPassword ? <img src={eye} /> : <img src={eyeLock}/>}
        </span>
      </button>
    </div>
  )
}

export default Email