
/* DEPENDENCIES */
const database = require('../database/database');
require("dotenv").config();

exports.query_companies = async function (tier = null) {
    if (tier == null)
        return await database.query(
            `SELECT PGP_SYM_DECRYPT(domain.name :: bytea, '${process.env.DB_ENCRYPTION_KEY}') AS name, company.tier 
            FROM domain 
            INNER JOIN company ON company.id=domain.company_id WHERE PGP_SYM_DECRYPT(company.name :: bytea, '${process.env.DB_ENCRYPTION_KEY}') NOT LIKE 'QA%'`
        );
    else
        return await database.query(
            `SELECT PGP_SYM_DECRYPT(domain.name :: bytea, '${process.env.DB_ENCRYPTION_KEY}') AS name, company.tier 
            FROM domain 
            INNER JOIN company ON company.id=domain.company_id AND company.tier=${tier} WHERE PGP_SYM_DECRYPT(company.name :: bytea, '${process.env.DB_ENCRYPTION_KEY}') NOT LIKE 'QA%'`
        );
};