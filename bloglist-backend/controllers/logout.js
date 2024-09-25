const jwt = require('jsonwebtoken')
const router = require('express').Router()
const middleware = require('../util/middleware')
const tokenExtractor = middleware.tokenExtractor
const User = require('../models/user')
const Session = require('../models/session')

router.delete('/', tokenExtractor, async (req, res) => {

  const session = await Session.destroy({
    where: {
    userId: req.decodedToken.id
  }})

  res.status(204).end()
})

module.exports = router