const Sequelize = require("sequelize");

const {
    PGDATABASE,
    PGUSER,
    PGPASSWORD,
    PGHOST,
} = process.env;

const sequelizeInstance = new Sequelize(
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
  {
    host: PGHOST,
    dialect: "postgres",
  },
)

export default sequelizeInstance;