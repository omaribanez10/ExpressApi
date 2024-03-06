// userService.js
const getUserByUsernameAndPassword = async (connection, username, password) => {
    const [user] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1', [username, password]);
    if (user?.id) {
        const insertedUserId = Number(user.id);
        return { id: insertedUserId, name: user.name, username: user.username };
    } else {
        return null;
    }
};

const createUser = async(connection, fullname, username, password) => {
    try {

        const user = await connection.query(
            'INSERT INTO users (name, username, password) VALUES (?, ?, ?)',
            [fullname, username, password]
        );
        const insertedUserId = Number(user.insertId);
        return { id: insertedUserId, name: fullname, username: username };

    } catch (error) {
        // Manejo de errores...
        throw error;
    }
}

module.exports = {
    getUserByUsernameAndPassword,
    createUser
    // Otros métodos relacionados con la gestión de usuarios...
};
