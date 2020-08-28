const errorHandler = (error, request, response, next) => {
  if(process.env.NODE_ENV !== 'test'){
    console.error(error.message)
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.split(' ')[1]
  }
  
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor
}