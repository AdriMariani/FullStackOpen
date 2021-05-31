import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [].concat(blogs).sort((a,b) => b.likes - a.likes)

  return (
    <div id='blogList'>
      {sortedBlogs.map(blog =>
        <p key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </p>
      )}
    </div>
  )
}

export default BlogList