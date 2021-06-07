import React from 'react'
import { Button, Navbar, Nav, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeUser } from '../reducers/userReducer'

const NavBar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(removeUser())
  }

  const margin = {
    marginBottom: '20px'
  }

  return (
    <Navbar style={margin} collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Brand>Blog App</Navbar.Brand>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to="/blogs">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users">Users</Link>
          </Nav.Link>
        </Nav>
        <Nav.Link href="#" as="span">
          <em>{user.name} is currently logged in</em>
        </Nav.Link>
        <Form inline>
          <Button onClick={handleLogout}>Logout</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar