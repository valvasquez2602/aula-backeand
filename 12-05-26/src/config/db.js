const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "quitanda",
    password: "senai",
    port: 3000
});

module.exports = pool;

