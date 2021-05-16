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
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const sortedBlogs = [].concat(blogs).sort((a,b) => b.likes - a.likes)

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

  const handleLogin = credentials => {
    loginService
      .login(credentials)
      .then(userData => {
        window.localStorage.setItem(
          'loggedBlogAppUser', JSON.stringify(userData)
        )
        setUser(userData)
        blogService.setToken(userData.token)
      })
      .catch(() => addNotification('Invalid username or password', true))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = blogObject => {
    blogService
      .createBlog(blogObject)
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
        addNotification(`${newBlog.title} by ${newBlog.author} added.`, false)
      })
      .catch(err => addNotification(err.response.data.error, true))
  }

  const likeBlog = blogObject => {
    blogService
      .updateBlog({
        ...blogObject,
        likes: blogObject.likes + 1
      })
      .then(updatedBlog => {
        setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : updatedBlog))
        addNotification(`Successfully liked ${blogObject.title} by ${blogObject.author}.`, false)
      })
      .catch(err => addNotification(err.response.data.error, true))
  }

  const deleteBlog = blogToDelete => {
    if(window.confirm(`Delete ${blogToDelete.title} by ${blogToDelete.author}?`)){
      blogService
        .deleteBlog(blogToDelete.id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
          addNotification(`Successfully deleted ${blogToDelete.title} by ${blogToDelete.author}`, false)
        })
        .catch(err => addNotification(err.response.data.error, true))
    }
  }

  return (
    user === null ?
      <>
        <h2>Login to Application</h2>
        <Notification notification={notification}/>
        <LoginForm handleLogin={handleLogin}/>
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
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <div id='blogList'>
          {sortedBlogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={() => likeBlog(blog)}
              showDelete={blog.user.username === user.username}
              deleteBlog={() => deleteBlog(blog)}
            />
          )}
        </div>
      </div>
  )
}

export default App