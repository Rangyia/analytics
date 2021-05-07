const database = require('../database/database');

exports.get_company_key = async function (comp_name) {
    return await database.query(
        `SELECT PGP_SYM_DECRYPT(key :: bytea, '${process.env.DB_ENCRYPTION_KEY}') AS key FROM analytic WHERE LOWER('${comp_name}') ~ LOWER(PGP_SYM_DECRYPT(name :: bytea, '${process.env.DB_ENCRYPTION_KEY}'))`
    ).then(data => data.rows[0]['key'].toString());
};

exports.get_company_id = async function (comp_name) {
    return await database.query(
        `SELECT id FROM analytic WHERE LOWER('${comp_name}')=LOWER(PGP_SYM_DECRYPT(name :: bytea, '${process.env.DB_ENCRYPTION_KEY}'))`
    ).then(data => data.rows[0]['id'].toString());
};

exports.verify_company_name = async function (comp_name) {
    return await database.query(
        `SELECT * FROM analytic WHERE LOWER('${comp_name}')=LOWER(PGP_SYM_DECRYPT(name :: bytea, '${process.env.DB_ENCRYPTION_KEY}'))`
    ).then(data => data.rows);
};

exports.format_add_date = function (timestamp) {
    let date = new Date(timestamp);
    if (date.getMonth() == 0) 
        return 12 + "-" + 1 + "-" + (date.getFullYear() - 1);

    return ((date.getMonth())) + "-" + (date.getDate()) + "-" + date.getFullYear();
}

exports.format_date = function (timestamp) {

    let date = new Date(timestamp);

    if (date.getDate() != 1) {
        return ((date.getMonth()) + 1) + "-" + (date.getDate()) + "-" + date.getFullYear();
    } else {
        if (date.getMonth() == 0)
            return 12 + "-" + 1 + "-" + (date.getFullYear() - 1);

        return ((date.getMonth())) + "-" + (date.getDate()) + "-" + date.getFullYear();
    }
}

exports.getDateNow = function() {
    let strDate = new Date()
    return (strDate.getMonth() + 1) + "-" + (strDate.getDate()) + "-" + strDate.getFullYear();
}

exports.getDate = function(offset) {
    let strDate = new Date()

    strDate = strDate.setDate( strDate.getDate() - offset );
    let date = new Date(strDate)
    return (date.getMonth() + 1) + "-" + (date.getDate()) + "-" + date.getFullYear();
}

exports.addColumn = async (table, column, columnType, defaultValue) => {
    return await database.query(
        `ALTER TABLE 
            ${table} 
        ADD COLUMN IF NOT EXISTS 
            ${column} ${columnType} 
        NOT NULL 
            DEFAULT ${defaultValue}`
    )
};

exports.editColumnType = async (table, column, columnType) => {
    return await database.query(
        `ALTER TABLE 
            ${table} 
        ALTER COLUMN
            ${column} TYPE ${columnType}`
    )
};

exports.deleteColumn = async (table, column) => {
    return await database.query(
        `ALTER TABLE 
            ${table} 
        DROP COLUMN
            ${column}`
    )
};

exports.insert = async (table, column, value) => {
    const key = await this.get_company_id(table)
    return await database.query(
        `INSERT INTO data_${key}_log (${column}) VALUES (${value})`
    )
};

/**
 * Converts array of values to string for dynamic columns
 * @returns string with the array values split by comma and space
 */
exports.normalizeColumns = async (dynamicList) => {
    return dynamicList.join(', ')
};
