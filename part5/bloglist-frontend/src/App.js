import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = event => {
    event.preventDefault()

    loginService
      .login({ username, password })
      .then(userData => {
        window.localStorage.setItem(
          'loggedBlogAppUser', JSON.stringify(userData)
        )
        setUser(userData)
        blogService.setToken(userData.token)
        setUsername('')
        setPassword('')
      })
      .catch(err => alert('Invalid username or password'))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = async event => {
    event.preventDefault()

    const newBlog = await blogService.createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })

    setBlogs(blogs.concat(newBlog))
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
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
        <p>
          {`${user.name}  is currently logged in.\t`}
          <button onClick={handleLogout}>logout</button>
        </p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        <BlogForm 
          blogTitle={blogTitle}
          setBlogTitle={setBlogTitle}
          blogAuthor={blogAuthor}
          setBlogAuthor={setBlogAuthor}
          blogUrl={blogUrl}
          setBlogUrl={setBlogUrl}
          addBlog={addBlog}
        />
      </div> 
  )
}

export default App