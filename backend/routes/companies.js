/* API ROUTER */
const express = require('express');
const model = require('../models/companies')
const companiesRouter = express.Router();

companiesRouter.get('/', async function (req, res) {
    let companies = null;
    let tier = req.query.tier;
    
    try {
        if (tier != null || tier == undefined) {
            companies = await model.query_companies(tier);
            res.json(companies.rows);
        } else if (tier == undefined) {
            companies = await model.query_companies();
            res.json(companies.rows);
        }
    } catch (err) {
        console.error(err);
    }
    
})

/* EXPORT ROUTES */
module.exports = companiesRouter;