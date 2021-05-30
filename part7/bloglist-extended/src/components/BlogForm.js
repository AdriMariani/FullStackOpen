import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

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
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input name='title' />
        </div>
        <div>
          Author:
          <input name='author' />
        </div>
        <div>
          Url:
          <input name='url' />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

// no longer takes props
// BlogForm.propTypes = {
//   createBlog: PropTypes.func.isRequired
// }

export default BlogForm