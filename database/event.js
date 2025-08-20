const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  benchmark: true,
  dialectModule: require("mysql2"),
  logging: false,
});


(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");
    await sequelize.sync({ alter: true }); // auto update tables if changed
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
