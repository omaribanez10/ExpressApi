// src/config.js
module.exports = {
    db: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: process.env.DB_PASSWORD || 'OMARibanez9704',
      database: 'test',
    },
    jwtSecret: process.env.JWT_SECRET || 'tu-secreto-jwt',
  };
