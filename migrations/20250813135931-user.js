"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Name: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      Date: {
        allowNull: true,
        type: Sequelize.DATE, // changed from NUMBER to DATE
      },
      Location: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      Message: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user");
  },
};
