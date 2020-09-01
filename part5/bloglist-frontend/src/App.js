import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [notification, setNotification] = useState(null)

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

  const addNotification = (msg, isError) => {
    setNotification({ msg, isError })
    setTimeout(() => setNotification(null), 5000)
  }

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
      .catch(err => addNotification('Invalid username or password', true))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const addBlog = event => {
    event.preventDefault()

    blogService
      .createBlog({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      })
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
        addNotification(`${newBlog.title} by ${newBlog.author} added.`, false)
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
      })
      .catch(err => addNotification(err.response.data.error, true))
  }

  return (
    user === null ?
      <>
        <h2>Login to Application</h2>
        <Notification notification={notification}/> 
        <LoginForm 
          username={username} 
          password={password} 
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </> :
      <div>
        <h2>Blogs</h2>
        <Notification notification={notification}/> 
        <p>
          {`${user.name}  is currently logged in.\t`}
          <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel='New Blog'>
          <h2>Create New Blog</h2>
          <BlogForm 
            blogTitle={blogTitle}
            setBlogTitle={setBlogTitle}
            blogAuthor={blogAuthor}
            setBlogAuthor={setBlogAuthor}
            blogUrl={blogUrl}
            setBlogUrl={setBlogUrl}
            addBlog={addBlog}
          />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div> 
  )
}

export default App