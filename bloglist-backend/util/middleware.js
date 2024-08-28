const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const errorHandler = (error, request, response, next) => {
    console.log("virheidenkäsittelymiddleware")
    console.log(error.name)
  
    if (error.name === 'SequelizeDatabaseError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    else if (error.name === 'SyntaxError') {
      return response.status(400).send({ error: 'malformatted or missing fields' })
    }

    else if (error.name === 'SequelizeValidationError') {
        return response.status(400).send(error.message)
      }
  
    next(error)
  }

  const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        console.log(authorization.substring(7))
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      } catch (error){
        console.log(error)
        return res.status(401).json({ error: 'token invalid' })
      }
    } else {
      return res.status(401).json({ error: 'token missing' })
    }
    next()
  }

module.exports = { errorHandler, tokenExtractor }