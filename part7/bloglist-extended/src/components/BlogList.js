import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [].concat(blogs).sort((a,b) => b.likes - a.likes)

  return (
    <ListGroup id='blogList'>
      {sortedBlogs.map(blog =>
        <ListGroup.Item key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </ListGroup.Item>
      )}
    </ListGroup>
  )
}

export default BlogList