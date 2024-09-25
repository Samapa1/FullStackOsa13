const router = require('express').Router()
const { Blog } = require('../models')
const { User } = require('../models')
const { Readinglists } = require('../models')

router.get('/', async (req, res) => {
const users = await User.findAll({
    include: {
        model: Blog,
        attributes: { exclude: ['userId'] }
    }
    })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    console.log(error)
    next(error)
  }
})

router.put('/:username', async (req, res) => {
    try {
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
        })
    if (user) {
        user.name = req.body.name
        await user.save()
        res.json(user)
    } else {
        res.status(404).end()
    }
    }
    catch(error) {
        console.log(error)
        next(error)
    }
})

router.get('/:id', async (req, res) => {

  const where = {}
    
  if (req.query.read) {
    where.read = req.query.read === "true"
  }

  const user = await User.findByPk(req.params.id, { 
    attributes: { exclude: ['createdAt', 'updatedAt'] } ,
     include:[{
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt']},
        through: {
          attributes: ['read', 'id'],
          where
        },

  }]

  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router