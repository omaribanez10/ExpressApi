// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/auth');
const othersRoutes = require('./routes/others');
const app = express();

app.use(express.json());

// Rutas públicas (sin autenticación)
app.use('/auth', authRoutes);

// Middleware de autenticación JWT
app.use(authMiddleware);

// Rutas protegidas (requieren autenticación)
app.use('/api', othersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
