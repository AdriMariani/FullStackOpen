import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { removeUser, setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import { Switch, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import { setUsers } from './reducers/blogUsersReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    dispatch(setUsers())
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
        <Link to='/blogs'>Blogs</Link>
        <Link to='/users'>Users</Link>
        <Notification />
        <p>
          {`${user.name}  is currently logged in.\t`}
          <button onClick={handleLogout}>logout</button>
        </p>
        <Switch>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path={['/blogs', '']}>
            <Togglable buttonLabel='New Blog'>
              <h2>Create New Blog</h2>
              <BlogForm />
            </Togglable>
            <BlogList />
          </Route>
        </Switch>
      </div>
  )
}

export default App