/* API ROUTER */
const express = require('express');
const model = require('../models/logs')
const logRouter = express.Router();

logRouter.get('/', async function(req, res) {
    try {
        console.log(req.query.company)
        const logs = await model.queryFields(req.query.company, req.query.offset);
        res.json(logs)
    } catch (err) {
        console.error(err);
    }
})

/* EXPORT ROUTES */
module.exports = logRouter;