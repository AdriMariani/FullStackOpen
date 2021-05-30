import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { removeUser, setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(removeUser())
  }

  return (
    user === null ?
      <>
        <h2>Login to Application</h2>
        <Notification />
        <LoginForm />
      </> :
      <div>
        <h2>Blogs</h2>
        <Notification />
        <p>
          {`${user.name}  is currently logged in.\t`}
          <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel='New Blog'>
          <h2>Create New Blog</h2>
          <BlogForm />
        </Togglable>
        <BlogList />
      </div>
  )
}

export default App