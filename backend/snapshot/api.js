/* DEPENDENCIES */
const database = require('../database/database');
require("dotenv").config();
const dbUtilities = require('../utils/dbUtilities');
const axios = require('axios');

// ------------------------ COMPANIES ------------------------------ //

exports.getCompanies = async function () {
    return await database.query(
        `SELECT PGP_SYM_DECRYPT(analytic.name :: bytea, '${process.env.DB_ENCRYPTION_KEY}') AS name, id
        FROM analytic`
    );
}

// ------------------------ samplecompany ------------------------------ //

exports.getsamplecompanyAppDataCount = async function (company_name, entityDef, name) {
    try {
        let company_key = await dbUtilities.get_company_key(company_name)
        let auth = 'Basic ' + Buffer.from(process.env.API_USER + ':' + process.env.API_PASSWORD).toString('base64');

        let headers = {
            hostname: "apiservice.samplecompany.com",
            path: `/v1/analytics/${company_key}/projects/0/query`,
            method: 'POST',
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        let body = {
            'PropertyName': 'Query',
            'Scope': {
                'Sample': 'Any'
            }
        }

        return axios.post(`https://${process.env.samplecompanyENVIRONMENT}service.samplecompany.com/v1/analytics/${company_key}/projects/0/query`, body, headers)
            .then(res => res.data.count)
            .catch((err) => {
                console.log("API error calling samplecompany: ", err);
            });

    } catch (err) {
        console.log(err)
    }
};

exports.getUserCount = async function (company_name) {
    try {
        let company_key = await dbUtilities.get_company_key(company_name)
        let auth = 'Basic ' + Buffer.from(process.env.API_USER + ':' + process.env.API_PASSWORD).toString('base64');

        let headers = {
            'Authorization': auth,
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application.json'
        };

        return axios.get(`https://${process.env.samplecompanyENVIRONMENT}service.samplecompany.com/v1/analytics/${company_key}/projects/0/admin/groups/contacts`, { headers })
            .then(res => res.data.length)
            .catch((err) => {
                console.log("API error calling samplecompany: ", err);
            });
    } catch (err) {
        console.log(err)
    }
}

// ------------------------ analytics ------------------------------ //

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

exports.getCompanyList = async function (company_name) {
    try {
        let auth = 'Basic ' + Buffer.from(process.env.analytics_API_USER + ':' + process.env.analytics_API_PASSWORD).toString('base64');

        let headers = {
            'Authorization': auth,
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': '*/*'
        };

        return axios.get(`https://samplecompany.analytics.com/api/v2/companies/autocomplete?name=${company_name.replace(/ /g, "%20")}`, { headers })
            .then(res => {
                let comparr = res.data.companies
                let arr = [];
                arr.push(comparr[0]['id'])
                return arr;
            })
            .catch((err) => {
                console.log("analytics API Error: ", err);
            });
    } catch (err) {
        console.log(err)
    }
};

exports.getTicketCount = async function (company_name, date, open_date) {
    try {

        // Get company ids
        const company_ids = await this.getCompanyList(company_name);
        const timeToResolve = [];
        const ticketMetrics = {

            'ticket': 0,
            'ticket_total': 0,
            'ticket_open': 0,
            'ticket_closed': 0,

            'status_open': 0,
            'status_pending': 0,
            'status_investigating': 0,
            'status_escalated': 0,
            'status_onhold': 0,
            'status_considering': 0,
            'status_resolved': 0,
            'status_closed': 0,
            'status_unknown': 0,

            'type_question': 0,
            'type_data_request': 0,
            'type_program_error': 0,
            'type_onboarding_issue': 0,
            'type_suggestion': 0,
            'type_defect': 0,
            'type_performance': 0,
            'type_unknown': 0,
            'type_dataaccess': 0,
            'type_enhancement': 0,

            'severity_low': 0,
            'severity_medium': 0,
            'severity_high': 0,
            'severity_urgent': 0,
            'severity_unknown': 0,

            'type_by_month_question': 0,
            'type_by_month_data_request': 0,
            'type_by_month_program_error': 0,
            'type_by_month_onboarding_issue': 0,
            'type_by_month_suggestion': 0,
            'type_by_month_defect': 0,
            'type_by_month_performance': 0,
            'type_by_month_enhancement': 0,
            'type_by_month_unknown': 0,

            'severity_by_month_low': 0,
            'severity_by_month_medium': 0,
            'severity_by_month_high': 0,
            'severity_by_month_urgent': 0,
            'severity_by_month_unknown': 0,

            'time_to_resolve': 0,
        };

        let auth = 'Basic ' + Buffer.from(process.env.analytics_API_USER + ':' + process.env.analytics_API_PASSWORD).toString('base64');

        let headers = {
            'Authorization': auth,
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': '*/*'
        };

        updateTicketStatusMetrics = function (status) {

            if (status == null || status == undefined || status == "") {
                ticketMetrics["status_unknown"] += 1;
                return;
            }

            switch (status) {
                case 2:
                    ticketMetrics['status_open'] += 1;
                    break;
                case 3:
                    ticketMetrics['status_pending'] += 1;
                    break;
                case 4:
                    ticketMetrics['status_resolved'] += 1;
                    break;
                case 5:
                    ticketMetrics['status_closed'] += 1;
                    break;
                case 8:
                    ticketMetrics['status_escalated'] += 1;
                    break;
                case 9:
                    ticketMetrics['status_investigating'] += 1;
                    break;
                case 10:
                    ticketMetrics['status_considering'] += 1;
                    break;
                case 11:
                    ticketMetrics['status_onhold'] += 1;
                    break;
                default:
                    console.error("Ticket status is invalid: " + status);
            }
        };

        updateTicketTypeMetrics = function (type) {

            if (type == null || type == undefined || type == "") {
                ticketMetrics["type_unknown"] += 1;
                return;
            }

            const tick = format_type(type)
            switch (tick) {
                case "type_question":
                    ticketMetrics['type_question'] += 1;
                    break;
                case "type_data_request":
                    ticketMetrics['type_data_request'] += 1;
                    break;
                case "type_program_error":
                    ticketMetrics['type_program_error'] += 1;
                    break;
                case "type_onboarding_issue":
                    ticketMetrics['type_onboarding_issue'] += 1;
                    break;
                case "type_defect":
                    ticketMetrics['type_defect'] += 1;
                    break;
                case "type_performance":
                    ticketMetrics['type_performance'] += 1;
                    break;
                case "type_dataaccess":
                    ticketMetrics['type_dataaccess'] += 1;
                    break;
                case "type_enhancement":
                    ticketMetrics['type_enhancement'] += 1;
                    break;
                case "type_suggestion":
                    ticketMetrics['type_suggestion'] += 1;
                    break;
                default:
                    console.error("Ticket type is invalid: " + type);
                    break;
            }
        };

        updateTicketTypeByMonthMetrics = function (type) {

            if (type == null || type == undefined || type == "") {
                ticketMetrics["type_by_month_unknown"] += 1;
                return;
            }

            const tick = format_type(type)

            switch (tick) {
                case "type_question":
                    ticketMetrics['type_by_month_question'] += 1;
                    break;
                case "type_data_request":
                    ticketMetrics['type_by_month_data_request'] += 1;
                    break;
                case "type_program_error":
                    ticketMetrics['type_by_month_program_error'] += 1;
                    break;
                case "type_onboarding_issue":
                    ticketMetrics['type_by_month_onboarding_issue'] += 1;
                    break;
                case "type_defect":
                    ticketMetrics['type_by_month_defect'] += 1;
                    break;
                case "type_performance":
                    ticketMetrics['type_by_month_performance'] += 1;
                    break;
                case "type_dataaccess":
                    ticketMetrics['type_by_month_dataaccess'] += 1;
                    break;
                case "type_enhancement":
                    ticketMetrics['type_by_month_enhancement'] += 1;
                    break;
                case "type_suggestion":
                    ticketMetrics['type_by_month_suggestion'] += 1;
                    break;
                default:
                    console.error("Ticket type by month is invalid: " + type);
                    break;
            }
        };

        updateTicketSeverityMetrics = function (severity) {

            if (severity == null || severity == undefined || severity == "") {
                ticketMetrics["severity_unknown"] += 1;
                return;
            }

            switch (severity.toString()) {
                case "1":
                    ticketMetrics['severity_low'] += 1;
                    break;
                case "2":
                    ticketMetrics['severity_medium'] += 1;
                    break;
                case "3":
                    ticketMetrics['severity_high'] += 1;
                    break;
                case "4":
                    ticketMetrics['severity_urgent'] += 1;
                    break;
                default:
                    console.error("Ticket severity is invalid: " + severity);
                    break;
            }
        };

        updateTicketSeverityByMonthMetrics = function (severity) {

            if (severity == null || severity == undefined || severity == "") {
                ticketMetrics["severity_by_month_unknown"] += 1;
                return;
            }

            switch (severity.toString()) {
                case "1":
                    ticketMetrics['severity_by_month_low'] += 1;
                    break;
                case "2":
                    ticketMetrics['severity_by_month_medium'] += 1;
                    break;
                case "3":
                    ticketMetrics['severity_by_month_high'] += 1;
                    break;
                case "4":
                    ticketMetrics['severity_by_month_urgent'] += 1;
                    break;
                default:
                    console.error("Ticket severity is invalid: " + severity);
                    break;
            }
        };

        ticketCount = async function (id, page) {

            return axios.get(`https://samplecompany.analytics.com/api/v2/tickets?company_id=${id}&page=${page}&include=stats`, { headers })
                .then(res => {
                    if (res.data === undefined || res.data.length == 0) {
                        return false;
                    } else {
                        let openDate = new Date(open_date);
                        let today = new Date(date);

                        for (var ticket in res.data) {

                            // Get date
                            let createdAt = new Date(res.data[ticket].created_at);

                            // Created this month
                            if (((today.getMonth() + 1) == (createdAt.getMonth() + 1)) && (today.getFullYear() == createdAt.getFullYear())) {
                                ticketMetrics['ticket'] += 1;
                                updateTicketSeverityByMonthMetrics(res.data[ticket].priority);
                                updateTicketTypeByMonthMetrics(res.data[ticket].type);

                                // If ticket is closed
                                if (res.data[ticket].status == '5' || res.data[ticket].status == '4') {
                                    let resolvedAt = new Date(res.data[ticket].stats.resolved_at);
                                    let time = format_timeDifference(createdAt, resolvedAt);
                                    timeToResolve.push(time);
                                }
                            }

                            if (res.data[ticket].status != '5' && res.data[ticket].status != '4') {

                                // Considering tickets
                                if ( res.data[ticket].status == '10') {
                                    if (createdAt <= openDate) {
                                        updateTicketStatusMetrics(res.data[ticket].status);
                                    }
                                } else {

                                    if (createdAt < openDate) {
                                        ticketMetrics['ticket_open'] += 1;
                                        updateTicketStatusMetrics(res.data[ticket].status);
                                        updateTicketSeverityMetrics(res.data[ticket].priority);
                                        updateTicketTypeMetrics(res.data[ticket].type);
                                    }
                                }

                                // Total tickets not closed (has considering and all other status' except for closed)
                                ticketMetrics['ticket_total'] += 1;

                            } else {
                                ticketMetrics['ticket_closed'] += 1;
                            }
                        }
                        return true;
                    }
                });
        };

        format_type = function (ticket) {

            if (ticket == "Error/Defect")
                return 'type_defect'

            if (ticket == "Performance Issue")
                return 'type_performance'

            if (ticket == "Data/Access Request")
                return 'type_dataaccess'

            if (ticket == "Enhancement Request")
                return 'type_enhancement'

            return 'type_' + ticket.replace(/\s/g, '_').toLowerCase();
        };

        format_timeDifference = function (createdAt, resolvedAt) {
            let difference_in_time = resolvedAt.getTime() - createdAt.getTime();
            return Math.round(difference_in_time);
        }

        format_daysToResolve = function (dayMetrics) {
            let sum = 0, avg = 0;
            for (let count in dayMetrics) {
                sum += dayMetrics[count];
            }
            return sum / dayMetrics.length;
        }

        let page = 1;
        let pageHasReponse = true;
        while (pageHasReponse) {
            await ticketCount(company_ids[0], page).then(res => {
                pageHasReponse = res;
                page++;
            });
        }

        let sum = 0
        for (let i in timeToResolve) {
            sum += timeToResolve[i];
        }

        if (timeToResolve != null || timeToResolve != undefined)
            ticketMetrics['time_to_resolve'] = Math.round(sum / timeToResolve.length);
        else
            ticketMetrics['time_to_resolve'] = 0;

        return ticketMetrics;
    } catch (err) {
        console.log(err);
    }
};
