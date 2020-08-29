const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialUsers = [
  {
    username: 'jteller',
    name: 'Jax Teller',
    password: 'samcro'
  },
  {
    username: 'chibs',
    name: 'Filip Telford',
    password: 'mayhem'
  }
]

const initialBlogs = [
  {
    title: "Masai Ujiri issues a powerful statement about bodycam footage from racist Oakland cop",
    author: "Lauren O'Neil",
    url: "https://www.blogto.com/city/2020/08/masai-ujiri-powerful-statement-racist-oakland-cop/",
    likes: 0
  },
  {
      title:"test",
      author:"test test",
      url: "https://www.exampleURL.com",
      likes: 20
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const getpopulatedBlogs = async () => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingBlogId = async () => {
  const blog = new Blog({
    title: "delete",
    url: "tobedeleted.com"
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
  getpopulatedBlogs,
  nonExistingBlogId
}

