// db.js

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'clinicaprosperar',
    password: 'postgres',
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool, 
};
