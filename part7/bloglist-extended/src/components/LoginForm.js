import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import loginService from '../services/login'
// import PropTypes from 'prop-types'

const LoginForm = () => {
  const dispatch = useDispatch()

  const onLogin = async event => {
    event.preventDefault()
    loginService.login({
      username: event.target.username.value,
      password: event.target.password.value
    }).then(userData => {
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(userData)
      )
      dispatch(setUser(userData))
    }).catch(() => dispatch(setNotification('Invalid username or password', true, 10)))
  }

  return (
    <div>
      <form id='loginForm' onSubmit={onLogin}>
        <div>
          username
          <input
            name="username"
            type="text"
          />
        </div>
        <div>
          password
          <input
            name="password"
            type="password"
          />
        </div>
        <button id='loginButton' type="submit">login</button>
      </form>
    </div>
  )
}

// component no longer has props
// LoginForm.propTypes = {
//   handleLogin: PropTypes.func.isRequired
// }

export default LoginForm