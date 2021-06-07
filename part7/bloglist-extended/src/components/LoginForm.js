import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import loginService from '../services/login'
import { Form, Button } from 'react-bootstrap'
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
      <Form id='loginForm' onSubmit={onLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
          />
          <Button id='loginButton' variant="primary" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

// component no longer has props
// LoginForm.propTypes = {
//   handleLogin: PropTypes.func.isRequired
// }

export default LoginForm