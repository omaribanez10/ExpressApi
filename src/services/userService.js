// userService.js
const getUserByUsernameAndPassword = async (connection, username, password) => {
    try {
        const user = await connection.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password]);
        return user;
    } catch (error) {
        // Manejo de errores...
        throw error;
    }
};

const createUser = async(connection, user) => {
    try {
        //const user = await connection.query('INSERT INTO usuarios ', [username, password]);
        return user;

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
