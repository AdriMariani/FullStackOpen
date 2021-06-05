import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
// import PropTypes from 'prop-types'

const Blog = () => {
  const dispatch = useDispatch()
  const { blogId } = useParams()
  const blog = useSelector(state => state.blogs.find(blog => blog.id === blogId))
  const user = useSelector(state => state.user)

  if (!user || !blog) { // data not done being retrieved (if user starts on this page initially)
    return null
  }

  const showDelete = user.username === blog.user.username

  const likeBlogHandler = () => {
    dispatch(likeBlog(blog))
      .then(() => {
        dispatch(setNotification(`Successfully liked ${blog.title} by ${blog.author}.`, false, 10))
      })
      .catch(error => dispatch(setNotification(error.response.data.error, true, 10)))
  }

  const deleteBlogHandler = () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
        .then(() => {
          dispatch(setNotification(`Successfully deleted ${blog.title} by ${blog.author}`, false, 10))
        })
        .catch(error => dispatch(setNotification(error.response.data.error, true, 10)))
    }
  }

  return (
    <div>
      <h2>
        {blog.title}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p className='likes'>
        {blog.likes} likes
        <button onClick={likeBlogHandler}>Like</button>
      </p>
      <p className='username'>Added By {blog.user.name}</p>
      {showDelete ? <button onClick={deleteBlogHandler}>Delete</button> : ''}
    </div>
  )
}

// no longer takes props
// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   likeBlog: PropTypes.func.isRequired,
//   showDelete: PropTypes.bool.isRequired,
//   deleteBlog: PropTypes.func.isRequired
// }

export default Blog
