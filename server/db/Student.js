const Sequelize = require('Sequelize');
const db = require('./db');

const Student = db.define('students', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  favorite_food: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image_url : {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Student;
