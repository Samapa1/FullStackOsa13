const { DataTypes, DATE } = require('sequelize')
  const cdate = new DATE()
  const currentYear = cdate.getFullYear()
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