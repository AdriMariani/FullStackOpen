import React from 'react'

const BlogForm = props => 
  <div>
    <form onSubmit={props.addBlog}>
      <div>
        Title:
        <input
          value={props.blogTitle}
          onChange={event => props.setBlogTitle(event.target.value)}
        />
      </div>
      <div>
        Author:
        <input
          value={props.blogAuthor}
          onChange={event => props.setBlogAuthor(event.target.value)}
        />
      </div>
      <div>
        Url:
        <input
          value={props.blogUrl}
          onChange={event => props.setBlogUrl(event.target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  </div> 

export default BlogForm