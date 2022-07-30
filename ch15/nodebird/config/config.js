require('dotenv').config();

module.exports = {
    development: {
      username: "root",
      password: process.env.SEQUELIZE_PASSWORD,
      database: "nodebird",
      host: "127.0.0.1",
      dialect: "mysql",
      port: 3307
    },
    test: {
      username: "root",
      password: process.env.SEQUELIZE_PASSWORD,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "mysql",
      port: 3307
    },
    production: {
      username: "root",
      password: process.env.SEQUELIZE_PASSWORD,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "mysql",
      port: 3307,
      logging: false
    }
  }