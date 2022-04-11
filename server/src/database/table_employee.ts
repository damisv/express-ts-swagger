import * as Sequelize from "sequelize";
import database from "./database";

const Employees = database.define("employees", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  companyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "companies",
      key: 'id',
    },
  },
});

export default Employees;