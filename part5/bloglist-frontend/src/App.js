import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = event => {
    event.preventDefault()

    loginService
      .login({ username, password })
      .then(userData => {
        setUser(userData)
        setUsername('')
        setPassword('')
      })
      .catch(err => alert('Invalid username or password'))
  }

  return (
    user === null ?
      <LoginForm 
        username={username} 
        password={password} 
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      /> :
      <div>
        <h2>Blogs</h2>
        <p>{user.name} is currently logged in.</p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div> 
  )
}

export default App