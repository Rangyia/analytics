/* API ROUTER */
require("dotenv").config();
const axios = require('axios')
const express = require('express');
const ticketsRouter = express.Router();

const getTicketList = async function (company_name) {
    try {
        let auth = 'Basic ' + Buffer.from(process.env.analytics_API_USER + ':' + process.env.analytics_API_PASSWORD).toString('base64');

        let headers = {
            'Authorization': auth,
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
        };

        const ticketCount = 5;

        return axios.get(`https://samplecompany.analytics.com/api/v2/search/tickets?query="cf_apicustname:'${company_name}'"`, { headers })
            .then(res => {
                const tickets = [];
                let count = 0;

                while (count < 5) {
                    if (res.data.results[count] != undefined) {
                        tickets.push({
                            id: res.data.results[count]["id"],
                            created: res.data.results[count].created_at,
                            subject: res.data.results[count].subject,
                            status: res.data.results[count].status,
                            type: res.data.results[count].type,
                        })
                    }
                    count++;
                }
                return tickets;
            })
            .catch((err) => {
                console.log("analytics API Error: ", err);
            });
    } catch (err) {
        console.log(err)
    }
};

ticketsRouter.get('/', async function (req, res) {
    try {
        const company = req.query.company.replace("%20", " ");

        const tickets = await getTicketList(company);

        res.json(tickets)
    } catch (err) {
        console.error(err);
    }
})

/* EXPORT ROUTES */
module.exports = ticketsRouter;