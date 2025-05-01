// config/db.config.js
module.exports = {
    HOST: "127.0.0.1",
    USER: "theo",
    PASSWORD: "2210",
    DB: "postgres",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };