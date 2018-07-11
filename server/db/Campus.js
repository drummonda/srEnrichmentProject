const Sequelize = require('Sequelize');
const db = require('./db');

const Campus = db.define('campuses', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  headmaster: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  headmaster_email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Campus;
