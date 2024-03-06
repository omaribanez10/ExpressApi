// src/routes/others.js
const express = require('express');
const router = express.Router();

router.get('/cards', (req, res) => {
    res.json({ mensaje: 'Tarjetas recargables' });
});

module.exports = router;
