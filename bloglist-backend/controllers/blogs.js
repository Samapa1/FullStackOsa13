const router = require('express').Router()
const { User } = require('../models')
const { Blog } = require('../models')
// const { tokenExtractor } = require('../util/middleware')
const middleware = require('../util/middleware')
const tokenExtractor = middleware.tokenExtractor


router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
  })
  
router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    console.log(req.body)
    // const user = await User.findOne()
    // const blog = await Blog.create({ ...req.body, userId: user.id })
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
    res.json(blog)
  }
  catch {
    next(error)
  }
})

// router.post('/', async (req, res, next) => {
//   try {
//     console.log(req.body)
//     const blog = await Blog.create(req.body)
//     res.json(blog)
//   }
//   catch {
//     next(error)
//   }
// })

router.delete('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    await blog.destroy()
    res.status(204).end()
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