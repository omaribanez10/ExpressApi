// src/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const pool = require('../db');
const userService = require('../services/userService');

router.post('/login', async (req, res) => {

    let connection;
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(422).json({ error: 'Se requieren los campos nombre usuario y contraseña.' });
        }
        connection = await pool.getConnection();
        const user = await userService.getUserByUsernameAndPassword(connection, username, password);
        if (user?.id) {
            const token = jwt.sign({ username: username, id: user.id }, config.jwtSecret, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        // Manejo de errores...
        throw error;
    } finally {
        if (connection) connection.release(); // Libera la conexión al pool
    }
});

router.post('/register', async (req, res) => {

    let connection;
    try {
        const { fullname, username, password } = req.body;
        const requiredFields = ['fullname', 'username', 'password'];
        // Verifica que todos los campos requeridos estén presentes
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            const errorMessage = `Se requieren los siguientes campos: ${missingFields.join(', ')}.`;
            return res.status(422).json({ error: errorMessage });
        }

        connection = await pool.getConnection();
        const user =  await userService.createUser(connection, fullname, username, password);
        if (user?.id) {
            //const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: '1h' });
            const token = jwt.sign({ username: user.username, id: user.id }, config.jwtSecret, { expiresIn: '1h' });

            res.json({ token });
        } else {
            res.status(401).json({ error: 'Ha ocurrido un error al generar el token.' });
        }
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            // Manejar el caso de duplicación de entrada (usuario ya existe)
            return res.status(409).json({ error: 'Nombre de usuario duplicado. Elija otro nombre de usuario.' });
        }
        // Manejo de errores...
        throw error;
    } finally {
        if (connection) connection.release(); // Libera la conexión al pool
    }
});

module.exports = router;
