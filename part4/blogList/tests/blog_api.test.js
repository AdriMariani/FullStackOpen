const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testHelper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHashes = await Promise.all(testHelper.initialUsers.map(user => {
    return bcrypt.hash(user.password, 10)
  }))

  const users = testHelper.initialUsers.map( (user, index) => { 
    const userObject = new User(user)
    userObject.passwordHash = passwordHashes[index]
    return userObject
  })
  const userPromises = users.map(user => user.save())
  await Promise.all(userPromises)

  const blogObjects = testHelper.initialBlogs.map(blog => {
    const blogObject = new Blog(blog)
    blogObject.user = users[Math.floor(Math.random() * users.length)]._id
    return blogObject
  })
  const promises = blogObjects.map(blog => blog.save())
  await Promise.all(promises)
})

describe('getting blogs', () => {
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

  test('can get a specific blog with its id', async () => {
    const blogs = await testHelper.getpopulatedBlogs()
    const blogToGet = blogs[0]

    const blogFromServer = await api
      .get(`/api/blogs/${blogToGet.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(blogFromServer.body).toEqual(blogToGet)
  })
})

describe('adding blogs', () => {
  test('can successfully add a blog', async () => {
    const newBlog = {
      title: "new blog",
      author: "Greg Newblog",
      url: "http://www.newblog.com",
      likes: 21
    }

    const login = await api
      .post('/api/login')
      .send({
        username: testHelper.initialUsers[0].username,
        password: testHelper.initialUsers[0].password
      })
      .expect(200)
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogs = await testHelper.blogsInDb()
    const blogTitles = blogs.map(blog => blog.title)
  
    expect(blogs).toHaveLength(testHelper.initialBlogs.length + 1)
    expect(blogTitles).toContain(newBlog.title)
  })

  test('adding blog without token fails', async () => {
    const blogsAtStart = await testHelper.blogsInDb()
    const newBlog = {
      title: "new blog",
      author: "Greg Newblog",
      url: "http://www.newblog.com",
      likes: 21
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await testHelper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
  
  test('adding blog missing likes property will have 0 likes', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'Greg Newblog',
      url: 'http://www.newblog.com'
    }

    const login = await api
      .post('/api/login')
      .send({
        username: testHelper.initialUsers[0].username,
        password: testHelper.initialUsers[0].password
      })
      .expect(200)
  
    const savedNote = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    expect(savedNote.body.likes).toBe(0)
  })
  
  test('blog missing title and url will not be added', async () => {
    const newBlog = {
      author: 'Greg Newblog'
    }

    const login = await api
      .post('/api/login')
      .send({
        username: testHelper.initialUsers[0].username,
        password: testHelper.initialUsers[0].password
      })
      .expect(200)
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('deleting a blog', () => {
  test('deleting a blog with a valid id', async () => {
    const blogs = await testHelper.getpopulatedBlogs()
    const blogToDelete = blogs[0]
    const user = testHelper.initialUsers.find(user => user.username === blogToDelete.user.username)

    const login = await api
      .post('/api/login')
      .send({
        username: user.username,
        password: user.password
      })
      .expect(200)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(204)

    const blogsAtEnd = await testHelper.getpopulatedBlogs()

    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
    expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length - 1)
  })

  test('deleting blog not created by user fails', async () => {
    const blogs = await testHelper.getpopulatedBlogs()
    const blogToDelete = blogs[0]
    const user = testHelper.initialUsers.find(user => user.username !== blogToDelete.user.username)
    
    const login = await api
      .post('/api/login')
      .send({
        username: user.username,
        password: user.password
      })
      .expect(200)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(401)

    const blogsAtEnd = await testHelper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length)
  })

  test('deleting a non-existent blog', async () => {
    const nonExistentId = await testHelper.nonExistingBlogId()

    const login = await api
      .post('/api/login')
      .send({
        username: testHelper.initialUsers[0].username,
        password: testHelper.initialUsers[0].password
      })
      .expect(200)

    await api
      .delete(`/api/blogs/${nonExistentId}`)
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(204)

    const blogs = await testHelper.blogsInDb()

    expect(blogs).toHaveLength(testHelper.initialBlogs.length)
  })

  test('deleting blog with invalid id', async () => {
    const login = await api
      .post('/api/login')
      .send({
        username: testHelper.initialUsers[0].username,
        password: testHelper.initialUsers[0].password
      })
      .expect(200)

    await api
      .delete('/api/blogs/444999')
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(400)
  })
})

describe('updating blogs', () => {
  test('update on blog', async () => {
    const blogs = await testHelper.blogsInDb()
    const blogToUpdate = blogs[0]
    blogToUpdate.likes = 420
    blogToUpdate.title = 'Updated Blog'

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await testHelper.blogsInDb()

    expect(blogsAtEnd).toContainEqual(blogToUpdate)
  })
})

afterAll(() => mongoose.connection.close())