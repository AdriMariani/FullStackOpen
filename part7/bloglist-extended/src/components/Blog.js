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
        <p className='titleAndAuthor'>
          {blog.title} by {blog.author}
          <button onClick={() => setHideDetails(false)}>View</button>
        </p> :
        <>
          <p className='titleAndAuthor'>
            {blog.title} by {blog.author}
            <button onClick={() => setHideDetails(true)}>Hide</button>
          </p>
          <p className='url'>{blog.url}</p>
          <p className='likes'>
            {blog.likes}
            <button onClick={likeBlog}>Like</button>
          </p>
          <p className='username'>{blog.user.name}</p>
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
