import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, showDelete, deleteBlog }) => {
  const [hideDetails, setHideDetails] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {hideDetails ?
        <p>
          {blog.title}
          <button onClick={() => setHideDetails(false)}>View</button>
        </p> :
        <>
          <p>
            {blog.title}
            <button onClick={() => setHideDetails(true)}>Hide</button>
          </p>
          <p>{blog.url}</p>
          <p>{blog.author}</p>
          <p>
            {blog.likes}
            <button onClick={likeBlog}>Like</button>
          </p>
          {showDelete ? <button onClick={deleteBlog}>Delete</button> : ''}
        </>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
