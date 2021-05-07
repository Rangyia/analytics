/* API ROUTER */
const express = require('express');
const model = require('../models/analytics')
const analyticsRouter = express.Router();

analyticsRouter.get('/', async function (req, res) {
    let analytics = null;
    let id = req.query.id;

    try {
        analytics = await model.query_analytics(id);
        res.json(analytics.rows)
    } catch (err) {
        console.error(err);
    }

})

/* EXPORT ROUTES */
module.exports = analyticsRouter;