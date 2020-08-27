const User = require('../models/user')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()

userRouter.post('/', async (request, response) => {
  if(!request.body.password) {
    return response.status(400).json({error: 'no password provided'})
  } else if (request.body.password.length < 3) {
    return response.status(400).json({error: 'password must be at least 3 characters'})
  }

  const passwordHash = await bcrypt.hash(request.body.password, 10)

  const user = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = userRouter