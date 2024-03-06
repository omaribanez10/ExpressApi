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
        //connection = await pool.getConnection();
        //const user = await userService.getUserByUsernameAndPassword(connection, username, password);
        /*const user = {
            id: 123,
            username: username,
            password: password,
            length:1
        };*/
        if (user.length === 1) {
            const token = jwt.sign({username}, config.jwtSecret, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        // Manejo de errores...
        throw error;
    } finally {
        //if (connection) connection.release(); // Libera la conexión al pool
    }
});

router.post('/register', async (req, res) => {

    //let connection;
    try {
        const { fullname, email, gender, username, password } = req.body;
        const requiredFields = ['fullname', 'email', 'gender', 'username', 'password'];
        // Verifica que todos los campos requeridos estén presentes
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            const errorMessage = `Se requieren los siguientes campos: ${missingFields.join(', ')}.`;
            return res.status(422).json({ error: errorMessage });
        }

        const user = {
            id: 1234,
            name: fullname,
            email: email,
            gender:gender,
            username: username,
            password: password,
            length:1
        };
        //connection = await pool.getConnection();
        if (user.length === 1) {
            //const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: '1h' });
            const token = jwt.sign({ username: user.username, id: user.id }, config.jwtSecret, { expiresIn: '1h' });

            res.json({ token });
        } else {
            res.status(401).json({ error: 'Ha ocurrido un error al generar el token.' });
        }
    } catch (error) {
        // Manejo de errores...
        throw error;
    } finally {
        //if (connection) connection.release(); // Libera la conexión al pool
    }
});

module.exports = router;
