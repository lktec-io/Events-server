const { Sequelize } = require("sequelize");


const sequelize = new Sequelize({
  host: "mysql.railway.internal",
  dialect: "mysql",
  username: "root",
  password: "jndESCgNMxeIQtlQNyiiPRqwUCuZLqeJ",
  database: "railway",
  benchmark: true,
  dialectModule: require("mysql2"),
  logging: false,
});
 
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;