
/* DEPENDENCIES */
const database = require('../database/database');
require("dotenv").config();

exports.query_analytics = async function (company_id) {
    return await database.query(
        `SELECT PGP_SYM_DECRYPT(analytic.name :: bytea, '${process.env.DB_ENCRYPTION_KEY}') AS name 
            FROM analytic
        WHERE analytic.company_id=${company_id}`
    );
}