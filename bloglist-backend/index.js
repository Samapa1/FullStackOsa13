const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')

const middleware = require('./util/middleware')

// const errorHandler = (error, request, response, next) => {
//   console.log("virheidenkäsittelymiddleware")
//   console.log(error.name)

//   if (error.name === 'SequelizeDatabaseError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   }

//   else if (error.name === 'SyntaxError') {
//     return response.status(400).send({ error: 'malformatted or missing fields' })
//   }

//   next(error)
// }

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()

app.use(middleware.errorHandler)

// require('dotenv').config()
// const { Sequelize, Model, DataTypes } = require('sequelize')
// const express = require('express')
// const app = express()

// const sequelize = new Sequelize(process.env.DATABASE_URL)

// class Blog extends Model {}

// Blog.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   author: {
//     type: DataTypes.TEXT
//   },
//   url: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   title: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   likes: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0
//   }
// }, {
//   sequelize,
//   underscored: true,
//   timestamps: false,
//   modelName: 'blog'
// })

// Blog.sync()

// app.get('/api/blogs', async (req, res) => {
//     const blogs = await Blog.findAll()
//     res.json(blogs)
//   })
  
//   const PORT = process.env.PORT || 3001
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
//   })

// app.use(express.json())

// app.post('/api/blogs', async (req, res) => {
//     console.log(req.body)
//     const blog = await Blog.create(req.body)
//     res.json(blog)
// })

// app.delete('/api/blogs/:id', async (req, res) => {
//     const blog = await Blog.findByPk(req.params.id)
//     await blog.destroy()
//     res.status(204).end()
//   })




