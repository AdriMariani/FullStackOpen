import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import { Switch, Route } from 'react-router-dom'
import Users from './components/Users'
import { setUsers } from './reducers/blogUsersReducer'
import UserView from './components/UserView'
import Blog from './components/Blog'
import NavBar from './components/NavBar'

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

  return (
    user === null ?
      <>
        <h2>Login to Application</h2>
        <Notification />
        <LoginForm />
      </> :
      <div>
        <NavBar />
        <h2>Blog App</h2>
        <Notification />
        <Switch>
          <Route path='/users/:username'>
            <UserView />
          </Route>
          <Route path='/blogs/:blogId'>
            <Blog />
          </Route>
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