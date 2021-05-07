/* DEPENDENCIES */
const e = require('express');
const database = require('../database/database');
const dbUtilities = require('../utils/dbUtilities');
const regexUtils = require('../utils/regexUtils');
require("dotenv").config();

exports.queryFields = async function (companyName, offset) {
    if (!offset)
        offset = 1;
    const isValidCompany = await dbUtilities.verify_company_name(companyName.replace("%20", " ")).then(res => {
        return res.length != 0;
    });

    if (!isValidCompany)
        return {
            "description": "Validation failed",
            "errors" : [{
                "param" : "company",
                "value": companyName,
                "message": "Company does not exist"
            }]
        };

    // Get company id
    const id = await dbUtilities.get_company_id(companyName.replace("%20", " "));
    
    // samplecompany | analytics | --> listed by date
    const logs = new Object();
  
    logs["samplecompany"] = await database.query(
        `SELECT 
            *
        FROM 
            log_samplecompany
        WHERE 
            log_samplecompany.analytic_id=${id}
        ORDER BY date DESC
        LIMIT ${offset}`
    ).then(res => {
        res.rows.map(ele => {
            ele.date = dbUtilities.format_add_date(ele.date)
        })
        return res.rows;
    })
    
    logs["analytics"] = await database.query(
        `SELECT 
            *
        FROM 
            log_analytics
        WHERE 
            log_analytics.analytic_id=${id}
        ORDER BY date DESC
        LIMIT ${offset}`
    ).then(res => {
        res.rows.forEach(ele => {
            ele.date = dbUtilities.format_date(ele.date)
        })
        return res.rows;
    })

    return logs;
};