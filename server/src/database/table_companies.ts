import * as Sequelize from "sequelize";
import database from "./database";

const Companies = database.define("companies", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  website: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default Companies;