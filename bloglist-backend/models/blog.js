const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

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
  },
  year: {
    type: DataTypes.INTEGER,
    default: false,
    validate: {
      min: {
          args: [1991],
          msg: "year should be in the range from 1991 to current year"
      },
      max: {
        args: [2024],
        msg: "year should be in the range from 1991 to current year"
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    references: { model: 'users', key: 'id' },
    },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'blog'
})

module.exports = Blog