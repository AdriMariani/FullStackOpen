const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})
  
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)

  const user = await User.findById(decodedToken.id)
  const blog = new Blog(request.body)
  blog.user = user._id

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  await savedBlog.populate('user', {username: 1, name: 1}).execPopulate()

  response.status(201).json(savedBlog)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', {username: 1, name: 1})

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
  const blog = await Blog.findById(request.params.id)

  if(!blog) {
    return response.status(204).end()
  } else if(decodedToken.id.toString() !== blog.user.toString()){
    return response.status(401).json({
      error: 'user is not authorized to delete this blog'
    })
  }

  await blog.remove()
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
  const blog = await Blog.findById(request.params.id)

  if(!blog) {
    return response.status(404).end()
  }

  request.body.user = blog.user
  blog.overwrite(request.body)
  await blog.save()
  
  response.json(blog)
})

module.exports = blogRouter