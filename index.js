/* DEPENDENCIES */
const express = require('express');
const app = express();
const cors = require("cors");
const path = require("path");

/* ENVIRONMENTAL VARIABLES */
const PORT = process.env.PORT || 5000;

/* CORS SECURITY - MIDDLE MAN */
app.use(cors());
app.use(express.json());

/* STATIC CONTENT */
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "app/build")));
}

/* ROUTE MAPPER */
const companiesRouter = require('./backend/routes/companies');
const logsRouter = require('./backend/routes/logs');
const domainsRouter = require('./backend/routes/domains');
const ticketsRouter = require('./backend/routes/tickets');

/* ROUTER STACK */
app.use('/api/v1/companies', companiesRouter);
app.use('/api/v1/logs', logsRouter);
app.use('/api/v1/domains', domainsRouter);
app.use('/api/v1/tickets', ticketsRouter);

/* 
 * CATCH ALL
 * => Very important so that users don't go browsing around.
 */
app.get("*", (req, res) => {
    res.json("Invalid/url");
});

/* MAIN */
app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
});