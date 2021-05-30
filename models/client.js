const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const client = sequelize.define(
  'client',
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
    email: {
      filed: 'Email',
      type: Sequelize.STRING,
    },
    password: {
      filed: 'Password',
      type: Sequelize.STRING,
    },
    number: {
      filed: 'Number',
      type: Sequelize.NUMBER,
    },
  },
  {
    timestamps: false,
  }
);

// sequelize.sync({ force: true }).then(() => {
//   console.log(`Database & tables created!`);
// });

module.exports = client;
