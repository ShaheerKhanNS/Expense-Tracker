const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Expense = sequelize.define("expenses", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  expense: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  worth: { type: Sequelize.BOOLEAN },
});

module.exports = Expense;
