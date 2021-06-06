import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE': {
      const id = action.data.id
      const blog = state.find(b => b.id === id)
      const changedBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      return state.map(b => b.id === id ? changedBlog : b)
    }
    case 'DELETE_BLOG': {
      const idToDelete = action.data.id
      return state.filter(blog => blog.id !== idToDelete)
    }
    case 'CREATE_BLOG':
      return [...state, action.data.newBlog]
    case 'ADD_COMMENT': {
      const blog = state.find(b => b.id === action.data.id)
      const changedBlog = {
        ...blog,
        comments: blog.comments.concat(action.data.comment)
      }
      return state.map(b => b.id === action.data.id ? changedBlog : b)
    }
    case 'INIT_BLOGS':
      return action.data.blogs
    default:
      return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch ({
      type: 'INIT_BLOGS',
      data: {
        blogs
      }
    })
  }
}

export const createBlog = blog => {
  return async (dispatch, getState) => {
    const token = getState().user.token
    const newBlog = await blogService.createBlog(blog, token)
    dispatch({
      type: 'CREATE_BLOG',
      data: {
        newBlog
      }
    })
    return newBlog
  }
}

export const likeBlog = blog => {
  return async (dispatch, getState) => {
    const token = getState().user.token
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const updatedBlog = await blogService.updateBlog(likedBlog, token)
    dispatch({
      type: 'LIKE',
      data: {
        id: updatedBlog.id
      }
    })
  }
}

export const deleteBlog = id => {
  return async (dispatch, getState) => {
    const token = getState().user.token
    await blogService.deleteBlog(id, token)
    dispatch({
      type: 'DELETE_BLOG',
      data: {
        id
      }
    })
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    await blogService.comment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: {
        id,
        comment
      }
    })
  }
}

export default blogReducer