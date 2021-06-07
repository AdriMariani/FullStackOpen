import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = event => {
    event.preventDefault()
    let title = event.target.title
    let author = event.target.author
    let url = event.target.url
    dispatch(createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })).then(newBlog => {
      dispatch(setNotification(`${newBlog.title} by ${newBlog.author} added.`, false, 10))
      title.value = ''
      author.value = ''
      url.value = ''
    }).catch(error => dispatch(setNotification(error.response.data.error, true, 10)))
  }

  return (
    <div>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control type='text' name='title' />
          <Form.Label>Author:</Form.Label>
          <Form.Control type='text' name='author' />
          <Form.Label>Url:</Form.Label>
          <Form.Control type='text' name='url' />
          <Button variant="primary" type="submit">Save</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

// no longer takes props
// BlogForm.propTypes = {
//   createBlog: PropTypes.func.isRequired
// }

export default BlogForm