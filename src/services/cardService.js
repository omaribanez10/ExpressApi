const getAllCards = async (connection) => {
    const cards = await connection.query('SELECT * FROM cards');
    // Convert BigInt id values to integers
    const formattedCards = cards.map(card => ({
        id: Number(card.id),
        name: card.name,
        data: card.data
    }));
    return formattedCards;
};


module.exports = {
    getAllCards
};
