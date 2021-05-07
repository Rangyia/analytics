import axios from "axios"
require("dotenv").config();

exports.getTicketList = async function (company_name) {
    try {
        let auth = 'Basic ' + Buffer.from(process.env.analytics_API_USER + ':' + process.env.analytics_API_PASSWORD).toString('base64');

        let headers = {
            'Authorization': auth,
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': '*/*'
        };

        return axios.get(`https://samplecompany.analytics.com/api/v2/search/tickets?query="cf_apicustname:'${company_name}'"`, { headers })
            .then(res => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log("analytics API Error: ", err);
            });
    } catch (err) {
        console.log(err)
    }
};