const pool = require("../config/database");

const findByEmail = async (email) => {
    const result = await pool.query(
        "SELECT id, email, password_hash, role FROM users WHERE email = $1",
        [email]
    );

    const row = result.rows[0];

    if (!row) {
        return null;
    }

    return {
        id: row.id,
        email: row.email,
        passwordHash: row.password_hash,
        role: row.role
    };
};

const create = async (email, passwordHash) => {
    const result = await pool.query(
        `INSERT INTO users (email, password_hash, role)
         VALUES ($1, $2, $3)
         RETURNING id, email, password_hash, role`,
        [email, passwordHash, "user"]
    );

    const row = result.rows[0];

    return {
        id: row.id,
        email: row.email,
        passwordHash: row.password_hash,
        role: row.role
    };
};

const updateRole = async (email, role) => {
    const result = await pool.query(
        `UPDATE users
         SET role = $1
         WHERE email = $2
         RETURNING id, email, password_hash, role`,
        [role, email]
    );

    const row = result.rows[0];

    if (!row) {
        return null;
    }

    return {
        id: row.id,
        email: row.email,
        passwordHash: row.password_hash,
        role: row.role
    };
};

module.exports = {
    findByEmail,
    create,
    updateRole
};