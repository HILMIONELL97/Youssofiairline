const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const aeroport = sequelize.define(
  'aeroport',
  {
    id: {
      filed: 'AiroportId',
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      filed: 'Name',
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

// sequelize.sync({ force: true }).then(() => {
//   console.log(`Database & tables created!`);
// });

module.exports = aeroport;
