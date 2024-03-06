// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use(authMiddleware);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
