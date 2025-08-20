const { DataTypes } = require("sequelize");
const sequelize = require("../database/event"); 
const bcrypt = require("bcrypt");

const Loged = sequelize.define("Loged", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,   // haitahifadhiwa kwenye DB
    validate: {
      matchesPassword(value) {
        if (value !== this.password) {
          throw new Error("Password hailingani na Confirm Password");
        }
      },
    },
  },
}, {
  tableName: "loged",
  timestamps: true,
  hooks: {
    beforeCreate: async (loged) => {
      if (loged.password) {
        const salt = await bcrypt.genSalt(10);
        loged.password = await bcrypt.hash(loged.password, salt);
      }
    },
    beforeUpdate: async (loged) => {
      if (loged.password) {
        const salt = await bcrypt.genSalt(10);
        loged.password = await bcrypt.hash(loged.password, salt);
      }
    },
  },
});

module.exports = Loged;
