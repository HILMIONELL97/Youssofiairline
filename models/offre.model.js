const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const offre = sequelize.define(
  'offre',
  {
    id: {
      filed: 'OffreId',
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    prix: {
      filed: 'Prix',
      type: Sequelize.INTEGER,
    },
    place: {
      filed: 'Place',
      type: Sequelize.INTEGER,
    },
    airline: {
      filed: 'Airline',
      type: Sequelize.STRING,
    },
    date_depart: {
      filed: 'DateDepart',
      type: Sequelize.STRING,
    },
    date_retour: {
      filed: 'DateRetour',
      type: Sequelize.STRING,
    },
    aeroport_depart: {
      filed: 'AeroportDepart',
      type: Sequelize.STRING,
    },
    aeroport_arriver: {
      filed: 'AeroportArriver',
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

module.exports = offre;
