import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeUser } from '../reducers/userReducer'
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(removeUser())
  }

  return (
    <div id='navbar'>
      <Link to='/blogs'>Blogs</Link>
      <Link to='/users'>Users</Link>
      {`${user.name}  is currently logged in.\t`}
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default NavBar