const Blog = require('./blog')
const User = require('./user')
const Readinglists = require ('./readinglist')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

Session.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglists, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglists, as: 'usersMarked' })

User.hasMany(Readinglists)
Blog.hasMany(Readinglists)
Readinglists.belongsTo(Blog)
Readinglists.belongsTo(User)

// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Blog, User, Readinglists
}