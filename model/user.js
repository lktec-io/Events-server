const { DataTypes } = require("sequelize");
const sequelize = require("../database/event");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Date: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Location: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Message: {
      type: DataTypes.STRING(50),
      allowNull: true,
    }
  },
  {
    tableName: "user",
    timestamps: true,
  }
);





module.exports = User;
