
/* DEPENDENCIES */
const database = require('../database/database');
require("dotenv").config();

exports.query_domains = async function (company_id) {
    return await database.query(
        `SELECT PGP_SYM_DECRYPT(domain.name :: bytea, '${process.env.DB_ENCRYPTION_KEY}') AS name 
            FROM domain
        WHERE domain.company_id=${company_id}`
    );
}