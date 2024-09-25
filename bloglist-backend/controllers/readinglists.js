const router = require('express').Router()
const { Readinglists } = require('../models')
const middleware = require('../util/middleware')
const tokenExtractor = middleware.tokenExtractor

router.post('/', tokenExtractor, async (req, res, next) => {
    try {
      console.log(req.body)
      const item = await Readinglists.create(req.body)
      res.json(item)
    }
    catch(error) {
      console.log(error)
      next(error)
    }
  })

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const item = await Readinglists.findByPk(req.params.id)
    if (item) {
      if (item.userId ===  req.decodedToken.id) {
      item.read = req.body.read
      await item.save()
      res.json(item)
      }
      else {
        res.status(401).end()
      }
  }
  else {
      res.status(404).end()
  }
  }
  catch(error) {
    console.log(error)
    next(error)
  }
})

  module.exports = router