import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = event => {
    event.preventDefault()

    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form id='loginForm' onSubmit={onLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='loginButton' type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm