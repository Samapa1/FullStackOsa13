require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL)

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

Blog.sync()

app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

app.use(express.json())

app.post('/api/blogs', async (req, res) => {
    console.log(req.body)
    const blog = await Blog.create(req.body)
    res.json(blog)
})

app.delete('/api/blogs/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    await blog.destroy()
    res.status(204).end()
  })

// require('dotenv').config()
// const { Sequelize, QueryTypes } = require('sequelize')
// const express = require('express')
// const app = express()

// const sequelize = new Sequelize(process.env.DATABASE_URL)

// app.get('/api/blogs', async (req, res) => {
//     const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
//     res.json(blogs)
//   })
//   const PORT = process.env.PORT || 3001

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })



