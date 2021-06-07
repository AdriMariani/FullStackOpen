import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { setNotification } from '../reducers/notificationReducer'
import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { Button, Form, Table } from 'react-bootstrap'
// import PropTypes from 'prop-types'

const Blog = () => {
  const dispatch = useDispatch()
  const { blogId } = useParams()
  const history = useHistory()
  const blog = useSelector(state => state.blogs.find(blog => blog.id === blogId))
  const user = useSelector(state => state.user)

  if (!user || !blog) { // data not done being retrieved (if user starts on this page initially)
    return null
  }

  const showDelete = user.username === blog.user.username

  const likeBlogHandler = () => {
    dispatch(likeBlog(blog))
      .then(() => {
        dispatch(setNotification(`Successfully liked "${blog.title}" by ${blog.author}.`, false, 10))
      })
      .catch(error => dispatch(setNotification(error.response.data.error, true, 10)))
  }

  const deleteBlogHandler = () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
        .then(() => {
          dispatch(setNotification(`Successfully deleted "${blog.title}" by ${blog.author}`, false, 10))
          history.push('/')
        })
        .catch(error => dispatch(setNotification(error.response.data.error, true, 10)))
    }
  }

  const commentBlogHandler = event => {
    event.preventDefault()
    const comment = event.target.comment
    dispatch(commentBlog(blog.id, comment.value))
      .then(() => {
        dispatch(setNotification(`Comment "${comment.value}" successfully added`, false, 10))
        comment.value = ''
      })
      .catch(error => dispatch(setNotification(error.response.data.error, true, 10)))
  }

  return (
    <div>
      <Table>
        <tbody>
          <tr>
            <td><strong>Title</strong></td>
            <td>{blog.title}</td>
          </tr>
          <tr>
            <td><strong>Url</strong></td>
            <td><a href={blog.url}>{blog.url}</a></td>
          </tr>
          <tr>
            <td><strong>Author</strong></td>
            <td>{blog.author}</td>
          </tr>
          <tr>
            <td><strong>Added By</strong></td>
            <td>{blog.user.name}</td>
          </tr>
          <tr>
            <td><strong>Likes</strong></td>
            <td>{blog.likes} likes</td>
          </tr>
        </tbody>
      </Table>
      <Button onClick={likeBlogHandler}>Like</Button>
      {showDelete ? <Button variant='danger' onClick={deleteBlogHandler}>Delete</Button> : ''}
      <div>
        <h3>Comments</h3>
        <Form onSubmit={commentBlogHandler}>
          <Form.Control type='text' name="comment" />
          <Button type="submit">Add Comment</Button>
        </Form>
        <ul>
          {
            blog.comments.map((comment, index) =>
              <li key={`${comment}${index}`}>
                {comment}
              </li>
            )
          }
        </ul>
      </div>
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
