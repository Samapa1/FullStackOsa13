const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Readinglists extends Model {}

Readinglists.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    references: { model: 'users', key: 'id' },
    },
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    references: { model: 'blogs', key: 'id' },
    },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'readinglist'
})

module.exports = Readinglists