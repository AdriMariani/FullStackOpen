import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = () => {
  const users = useSelector(state => state.users)
  const { username } = useParams()

  if (!users) {
    return null
  }

  const user = users.find(user => user.username === username)

  if (!user) {
    return (
      <div>
        <h4>User Not Found</h4>
      </div>
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Created Blogs</h3>
      <ul>
        {
          user.blogs.map(blog =>
            <li key={blog.id}>
              {blog.title}
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default UserView