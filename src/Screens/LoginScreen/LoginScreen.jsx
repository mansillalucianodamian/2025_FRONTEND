import React, { use, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import { login } from '../../services/authService'
import { useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext.jsx'
import './LoginScreen.css'

const LoginScreen = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { onLogin } = useContext(AuthContext)
  useEffect(
    () => {
      //Si venimos de verificar email, mostramos la alerta de verificacion
      const querry = new URLSearchParams(location.search)
      const from = querry.get('from')
      if (from === 'verified_email') {
        alert('Gracias por verificar tu email')
      }
    },
    [] //Solo queremos que se ejecute cuando se monte el componente
  )


  const LOGIN_FORM_FIELDS = {
    EMAIL: 'email',
    PASSWORD: 'password'
  }

  const initial_form_state = {
    [LOGIN_FORM_FIELDS.EMAIL]: '',
    [LOGIN_FORM_FIELDS.PASSWORD]: ''
  }

  const { response, error, loading, sendRequest, resetResponse } = useFetch()

  function handleLogin(form_state_sent) {
    resetResponse()
    sendRequest(
      () => {
        return login(
          form_state_sent[LOGIN_FORM_FIELDS.EMAIL],
          form_state_sent[LOGIN_FORM_FIELDS.PASSWORD]
        )
      }
    )
  }

  const {
    form_state,
    onInputChange,
    handleSubmit,
    resetForm
  } = useForm(initial_form_state, handleLogin)

  console.log(response)

  useEffect(
    () => {
      if (response && response.ok) {
        //Queremos que persista en memoria el auth token
        //Dejamos que el context se encargue de que sucedera
        onLogin(response.body.auth_token)
        navigate('/home')
      }
    },
    [response]
  )


  return (
    <div className="Form-container">
      <header className="Form-header">
          <img src="/logo Slack.png" alt="" />
      </header>

      <main className="Form-main">
        <h1 className="title-principal">Escribe tu correo electrónico para iniciar sesión</h1>
        <h3 className='title-mediun'>O elige una cuenta sino tienes una.</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email"></label>
            <input className='imput'
              type="text"
              placeholder="nombre-de-usuario@email.com"
              value={form_state[LOGIN_FORM_FIELDS.EMAIL]}
              name={LOGIN_FORM_FIELDS.EMAIL}
              onChange={onInputChange}
              id={'email'} />
          </div>
          <div>
            <label htmlFor="password"></label>
            <input className='imput'
              type="text"
              placeholder="*******"
              value={form_state[LOGIN_FORM_FIELDS.PASSWORD]}
              name={LOGIN_FORM_FIELDS.PASSWORD}
              onChange={onInputChange}
              id={'password'} />
          </div>

          {error && <span style={{ color: 'red' }}> {error.message} </span>}
          {response && <span style={{ color: 'green' }}> Usuario registrado con exito! </span>}

          {
            loading
              ? <button className='button-principal' disabled>Iniciar sesión</button> //Desactivar boton mientras se haga la peticion</button>
              : <button className='button-principal'>Iniciar sesión</button>
          }
        </form>
        <div className="Form-main__register">
          <span>¿Es tu primera vez en Slack?</span>
          <a href="">Crear una cuenta</a>
        </div>
      </main>
      <footer className="Form-footer">
          <a href="">Privacidad y términos</a>
          <a href="">Contactarnos</a>
          <a href="">Cambiar región</a>
      </footer>
    </div>

  )
}


export default LoginScreen 