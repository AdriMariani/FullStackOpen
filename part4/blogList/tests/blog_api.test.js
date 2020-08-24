const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testHelper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = testHelper.initialBlogs.map(blog => new Blog(blog))
  const promises = blogObjects.map(blog => blog.save())
  await Promise.all(promises)
})

test('all blogs are returned in json format', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(testHelper.initialBlogs.length)
})

test('a blog has the id property and not _id', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body[0].id).toBeDefined()
  expect(response.body[0]._id).toBeUndefined()
})

test('can successfully add a blog', async () => {
  const newBlog = {
    title: "new blog",
    author: "Greg Newblog",
    url: "http://www.newblog.com",
    likes: 21
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await testHelper.blogsInDb()
  const blogTitles = blogs.map(blog => blog.title)

  expect(blogs).toHaveLength(testHelper.initialBlogs.length + 1)
  expect(blogTitles).toContain(newBlog.title)
})

afterAll(() => mongoose.connection.close())