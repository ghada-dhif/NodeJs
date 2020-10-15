const Pool = require("pg").Pool;

const pool = new Pool({
    user: "openpg",
    password: "openpgpwd",
    host: "localhost",
    port: 5432,
    database: "soutenance"
});

module.exports = pool; 