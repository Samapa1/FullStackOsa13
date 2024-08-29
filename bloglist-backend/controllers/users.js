const router = require('express').Router()
const { Blog } = require('../models')
const { User } = require('../models')

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
    // return res.status(400).json({ error })
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
        // return res.status(400).json({ error })
    }
})

// router.get('/:username', async (req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: req.params.username
//         }
//         })
//   if (user) {
//     res.json(user)
//   } else {
//     res.status(404).end()
//   }
// })

module.exports = router