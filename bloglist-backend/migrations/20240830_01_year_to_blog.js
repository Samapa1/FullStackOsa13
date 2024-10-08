const { DataTypes, DATE } = require('sequelize')
  // const cdate = Date.now()
  // console.log(cdate)
  // const currentYear = cdate.getFullYear()
  let currentYear = new Date().getFullYear()
module.exports = {

  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      default: false,
      validate: {
        min: {
            args: [1991],
            msg: "year should be in the range from 1991 to current year"
        },
        max: {
          args: [currentYear],
          msg: "year should be in the range from 1991 to current year"
      }
    }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}