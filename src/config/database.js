const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "meeting_db",
  "sa",
  "Rabbit",
  {
    host: "127.0.0.1",
    dialect: "mssql",
    port: 1433,
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    },
    logging: false,
  }
);

module.exports = sequelize;
