const router = require('express').Router()
const { User } = require('../models')
const { Blog } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
      group: [['author']],
      attributes: ['author', [sequelize.fn('SUM', sequelize.col('likes')), 'likes'], [sequelize.fn('COUNT', sequelize.col('author')), 'blogs']],  
      include: [{model: User, attributes:[]}],
      raw:true
    })
    res.json(blogs)
  })

  module.exports = router