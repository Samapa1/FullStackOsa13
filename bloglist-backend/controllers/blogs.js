const router = require('express').Router()
const { User } = require('../models')
const { Blog } = require('../models')
const middleware = require('../util/middleware')
const tokenExtractor = middleware.tokenExtractor
const { Op } = require('sequelize')
const { sequelize } = require('../util/db')


router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
        [Op.or]: [
          {
            title: {
              [Op.substring]: req.query.search
            }
          },
          {
            author: {
              [Op.substring]: req.query.search
            }
          }
        ]
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
    order: [ 
      ['likes', 'DESC'] 
    ]
  
  })
  res.json(blogs)
  })
  
router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    console.log(req.body)
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
    res.json(blog)
  }
  catch(error) {
    console.log(error)
    next(error)
  }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  try {
    console.log("deletoidaan!")
    const blog = await Blog.findByPk(req.params.id)
    console.log(blog.userId)
    console.log(req.decodedToken.id)
    if (blog.userId === req.decodedToken.id) {
      await blog.destroy()
      res.status(204).end()
    }
    else {
      res.status(401).end()
    }
  }
  catch(error) {
    console.log(error)
    next(error)
  } 
  })

router.put('/:id', async (req, res, next) => {
    try {
      const blog = await Blog.findByPk(req.params.id)
      if (blog) { 
          blog.likes = req.body.likes
          await blog.save()
          res.json(blog)
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

