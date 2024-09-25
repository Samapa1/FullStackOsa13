const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const Session = require('../models/session')
const User = require('../models/user')

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

  const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    const session = await Session.findOne({ where: { token: authorization.substring(7) }})
    if (authorization && authorization.toLowerCase().startsWith('bearer ') && session) {
      try {
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        console.log(req.decodedToken)
        const user = await User.findByPk(req.decodedToken.id)
        console.log(user)
        if (user.disabled) {
          return res.status(401).json({error: 'user disabled'})
        }

      } catch (error){
        console.log(error)
        return res.status(401).json({ error: 'token invalid' })
      }
    } else {
      return res.status(401).json({ error: 'token missing or expired' })
    }
    next()
  }

module.exports = { errorHandler, tokenExtractor }