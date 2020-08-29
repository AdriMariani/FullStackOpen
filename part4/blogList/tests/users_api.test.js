const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const test_helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ 
    username: 'root', 
    name: 'root',
    passwordHash 
  })

  await user.save()
})

describe('getting users', () => {
  test('able to retrieve all users', async () => {
    const usersInDb = await test_helper.usersInDb()

    const result = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toHaveLength(usersInDb.length)
  })

  test('can fetch a specific user', async () => {
    const users = await test_helper.usersInDb()
    const user = users[0]

    const result = await api
      .get(`/api/users/${user.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.username).toEqual(user.username)
  })
})


describe('creating users', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await test_helper.usersInDb()

    const newUser = {
      username: 'jteller',
      name: 'Jax Teller',
      password: 'apassword',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await test_helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await test_helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await test_helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creating username with less than 3 characters fails', async () => {
    const usersAtStart = await test_helper.usersInDb()

    const user = {
      username: "ab",
      name: "person",
      password: "xyzabc"
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(result.body.error).toContain('username must be at least 3 characters')

    const usersAtEnd = await test_helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creating user with password under 3 characters fails', async () => {
    const usersAtStart = await test_helper.usersInDb()

    const user = {
      username: "testuser",
      name: "person",
      password: "a"
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(result.body.error).toContain('password must be at least 3 characters')

    const usersAtEnd = await test_helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creating a user without giving a password fails', async () => {
    const usersAtStart = await test_helper.usersInDb()

    const user = {
      username: "testuser",
      name: "person"
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(result.body.error).toContain('no password provided')

    const usersAtEnd = await test_helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creating a user without giving a username fails', async () => {
    const usersAtStart = await test_helper.usersInDb()

    const user = {
      name: "person",
      password: "apassword"
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(result.body.error).toContain('username must be provided')

    const usersAtEnd = await test_helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})