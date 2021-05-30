import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const sortedBlogs = [].concat(blogs).sort((a,b) => b.likes - a.likes)

  const likeBlogHandler = blog => {
    dispatch(likeBlog(blog))
      .then(() => {
        dispatch(setNotification(`Successfully liked ${blog.title} by ${blog.author}.`, false, 10))
      })
      .catch(error => dispatch(setNotification(error.response.data.error, true, 10)))
  }

  const deleteBlogHandler = blog => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
        .then(() => {
          dispatch(setNotification(`Successfully deleted ${blog.title} by ${blog.author}`, false, 10))
        })
        .catch(error => dispatch(setNotification(error.response.data.error, true, 10)))
    }
  }

  return (
    <div id='blogList'>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={() => likeBlogHandler(blog)}
          showDelete={blog.user.username === user.username}
          deleteBlog={() => deleteBlogHandler(blog)}
        />
      )}
    </div>
  )
}

export default BlogList