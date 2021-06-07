import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }

  return (
    <div>
      <h3>Users</h3>
      <Table striped>
        <tbody>
          <tr>
            <td><strong>User</strong></td>
            <td><strong>Blogs Created</strong></td>
          </tr>
          {
            users.map(user =>
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.username}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Users