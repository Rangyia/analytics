/* API ROUTER */
const express = require('express');
const model = require('../models/domains')
const domainsRouter = express.Router();

domainsRouter.get('/', async function (req, res) {
    let domains = null;
    let id = req.query.id;

    try {
        domains = await model.query_domains(id);
        res.json(domains.rows)
    } catch (err) {
        console.error(err);
    }

})

/* EXPORT ROUTES */
module.exports = domainsRouter;