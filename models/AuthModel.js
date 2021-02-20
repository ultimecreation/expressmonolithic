const db = require("../config/database");

module.exports = {
    saveUser: (user, callback) => {
        db.query(
            `INSERT INTO users
            SET username=?, email=?, password=?`,
            [user.username, user.email, user.password],
            (error, results, fields) => {
                if (error) return callback(error);
                if (results.length > 0) return callback(null, results);
            }
        );
    },
    getUserByEmail: (email, callback) => {
        db.query(
            `SELECT COUNT(*) AS total FROM users WHERE email=?`,
            [email],
            (error, results) => {
                if (error) return callback(errors, error);
                if (results) return callback(null, results);
            }
        );
    },
};
