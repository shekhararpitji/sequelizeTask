'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      pin_code: {
        type: Sequelize.STRING
      },
      phone_no: {
        type: Sequelize.STRING
      },
      userId:{
        type: Sequelize.INTEGER,

        references: {
          model: 'users',
          key:"id",
          as:"userId"
        },onDelete:'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  }
};