// src/routes/others.js
const express = require('express');
const pool = require('../db');
const cardService = require('../services/cardService');
const ratingCardService = require('../services/ratingCardService');
const userService = require('../services/userService');
const router = express.Router();

router.get('/cards', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const cards = await cardService.getAllCards(connection);
        res.json(cards);
    } catch (error) {
        // Manejo de errores...
        console.error('Error al obtener las cartas:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener las cartas.' });
    } finally {
        if (connection) connection.release(); // Libera la conexión al pool
    }
});

router.post('/rating_cards', async (req, res) => {
    let connection;
    try {
        const user_id = await userService.getUserToken(req.headers.authorization);
        const {
            card_id,
            rating
        } = req.body;
        const requiredFields = ['card_id', 'rating'];
        // Verifica que todos los campos requeridos estén presentes
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            const errorMessage = `Se requieren los siguientes campos: ${missingFields.join(', ')}.`;
            return res.status(422).json({
                error: errorMessage
            });
        }

        connection = await pool.getConnection();
        const oldRatingCard = await ratingCardService.getRatingCardByUser(connection, user_id, card_id);
        if (oldRatingCard?.id) {
            return res.status(400).json({error: "Ya se ha calificado esta carta"});
        }
        const ratingCard = await ratingCardService.createRating(connection, user_id, card_id, rating);
        res.json({
            id: ratingCard
        });

    } catch (error) {
        console.error('Error al calificar las cartas:', error);
        res.status(500).json({ error: 'Error interno del servidor al registrar las cartas.' });
    } finally {
        if (connection) connection.release(); // Libera la conexión al pool
    }
});

router.get('/rating_cards_user', async (req, res) => {
    let connection;
    try {
        const user_id = await userService.getUserToken(req.headers.authorization);
        connection = await pool.getConnection();
        const ratingCards = await ratingCardService.getRatingCardsByUser(connection, user_id);
        res.json(ratingCards);

    } catch (error) {
        console.error('Error al obtener las cartas calificadas por usted:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener las cartas calificadas por usted.' });
    } finally {
        if (connection) connection.release(); // Libera la conexión al pool
    }
});


module.exports = router;