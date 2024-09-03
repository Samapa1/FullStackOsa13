const router = require('express').Router()
// const { User } = require('../models')
// const { Blog } = require('../models')
const { Readinglists } = require('../models')
// const middleware = require('../util/middleware')

router.post('/', async (req, res, next) => {
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

  module.exports = router