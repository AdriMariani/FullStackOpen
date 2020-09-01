import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')

  const addBlog = event => {
    event.preventDefault()

    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            value={blogTitle}
            onChange={event => setBlogTitle(event.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            value={blogAuthor}
            onChange={event => setBlogAuthor(event.target.value)}
          />
        </div>
        <div>
          Url:
          <input
            value={blogUrl}
            onChange={event => setBlogUrl(event.target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm