// src/config.js
module.exports = {
    db: {
      host: 'tu-host',
      user: 'tu-usuario',
      password: 'tu-contraseña',
      database: 'tu-base-de-datos',
    },
    jwtSecret: process.env.JWT_SECRET || 'tu-secreto-jwt',
  };
