const User = require('../models/user')
const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const user = await User.findOne({username: request.body.username})
  const passwordCorrect = user === null 
    ? false
    : await bcrypt.compare(request.body.password, user.passwordHash)

  if (!user || !passwordCorrect) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userToken, config.SECRET)

  response.status(200).json({ 
    token,
    username: user.username,
    name: user.name
  })
})

module.exports = loginRouter