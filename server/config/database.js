const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',  // using PostgreSQL
  logging: false, // You can enable SQL query logging by setting this to true
});

exports.databaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQL database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the SQL database:', error);
  }
};

exports.sequelize = sequelize;
