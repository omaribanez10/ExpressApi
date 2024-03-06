const createRating = async (connection, user_id, card_id, rating) => {
    try {

        const ratingCard = await connection.query(
            'INSERT INTO rating_cards (user_id, card_id, rating, date) VALUES (?, ?, ?, NOW())',
            [user_id, card_id, rating]
        );
        return Number(ratingCard.insertId);
    } catch (error) {
        // Manejo de errores...
        throw error;
    }
}

const getRatingCardByUser = async(connection, user_id, card_id) => {
    const [ratingCard] = await connection.query('SELECT * FROM rating_cards WHERE user_id = ? AND card_id = ? LIMIT 1', [user_id, card_id]);
    if (ratingCard?.id) {
        const insertedUserId = Number(ratingCard.id);
        return { id: insertedUserId};
    } else {
        return null;
    }
}

const getRatingCardsByUser = async(connection, user_id) => {
    const ratingCards = await connection.query('SELECT * FROM rating_cards WHERE user_id = ?  ORDER BY date DESC',[user_id]);
    // Convert BigInt id values to integers
    const formattedCards = ratingCards.map(card => ({
        id: Number(card.id),
        user_id: Number(card.user_id),
        card_id: Number(card.card_id),
        rating:card.rating,
        date:card.date
    }));
    return formattedCards;
}

module.exports = {
    createRating,
    getRatingCardByUser,
    getRatingCardsByUser
};