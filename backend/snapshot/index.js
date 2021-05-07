/* DEPENDENCIES */
require("dotenv").config();
const database = require('../database/database');
const dbUtilities = require('../utils/dbUtilities')
const API = require('./api')

const _run_ = async (date, open_date) => {
    console.log("Snapshot started")

    // Get list of companies
    const company_query = await API.getCompanies();
    const company_list = company_query.rows.filter(comp => !comp.name.toLowerCase().includes("qa"));

    async function scraper(company, date) {

        console.log(company.name)

        // Schedule log
        const log = new Object();
        log['analytic_id'] = company.id;

        // Module: analytics
        const ticketModule = await API.getTicketCount(company.name, date, open_date);

        if (ticketModule != undefined) {
            log['ticket'] = ticketModule['ticket'] | 0;
            log['ticket_total'] = ticketModule['ticket_total'] | 0;
            log['ticket_open'] = ticketModule['ticket_open'] | 0;
            log['ticket_closed'] = ticketModule['ticket_closed'] | 0;
            log['status_open'] = ticketModule['status_open'] | 0;
            log['status_pending'] = ticketModule['status_pending'] | 0;
            log['status_investigating'] = ticketModule['status_investigating'] | 0;
            log['status_escalated'] = ticketModule['status_escalated'] | 0;
            log['status_onhold'] = ticketModule['status_onhold'] | 0;
            log['status_considering'] = ticketModule['status_considering'] | 0;
            log['status_resolved'] = ticketModule['status_resolved'] | 0;
            log['status_closed'] = ticketModule['status_closed'] | 0;
            log['status_unknown'] = ticketModule['status_unknown'] | 0;

            log['type_question'] = ticketModule['type_question'] | 0;
            log['type_data_request'] = ticketModule['type_data_request'] | 0;
            log['type_closed'] = ticketModule['type_closed'] | 0;
            log['type_program_error'] = ticketModule['type_program_error'] | 0;
            log['type_onboarding_issue'] = ticketModule['type_onboarding_issue'] | 0;
            log['type_suggestion'] = ticketModule['type_suggestion'] | 0;
            log['type_defect'] = ticketModule['type_defect'] | 0;
            log['type_performance'] = ticketModule['type_performance'] | 0;
            log['type_unknown'] = ticketModule['type_unknown'] | 0;
            log['type_enhancement'] = ticketModule['type_enhancement'] | 0;
            log['type_dataaccess'] = ticketModule['type_dataaccess'] | 0;

            log['severity_low'] = ticketModule['severity_low'] | 0;
            log['severity_medium'] = ticketModule['severity_medium'] | 0;
            log['severity_high'] = ticketModule['severity_high'] | 0;
            log['severity_urgent'] = ticketModule['severity_urgent'] | 0;
            log['severity_unknown'] = ticketModule['severity_unknown'] | 0;

            log['type_by_month_question'] = ticketModule['type_by_month_question'] | 0;
            log['type_by_month_data_request'] = ticketModule['type_by_month_data_request'] | 0;
            log['type_by_month_closed'] = ticketModule['type_by_month_closed'] | 0;
            log['type_by_month_program_error'] = ticketModule['type_by_month_program_error'] | 0;
            log['type_by_month_onboarding_issue'] = ticketModule['type_by_month_onboarding_issue'] | 0;
            log['type_by_month_suggestion'] = ticketModule['type_by_month_suggestion'] | 0;
            log['type_by_month_unknown'] = ticketModule['type_by_month_unknown'] | 0;
            log['type_by_month_defect'] = ticketModule['type_by_month_defect'] | 0;
            log['type_by_month_performance'] = ticketModule['type_by_month_performance'] | 0;
            log['type_by_month_enhancement'] = ticketModule['type_by_month_enhancement'] | 0;
            log['type_by_month_dataaccess'] = ticketModule['type_by_month_dataaccess'] | 0;


            log['severity_by_month_low'] = ticketModule['severity_by_month_low'] | 0;
            log['severity_by_month_medium'] = ticketModule['severity_by_month_medium'] | 0;
            log['severity_by_month_high'] = ticketModule['severity_by_month_high'] | 0;
            log['severity_by_month_urgent'] = ticketModule['severity_by_month_urgent'] | 0;
            log['severity_by_month_unknown'] = ticketModule['severity_by_month_unknown'] | 0;
            

            log['time_to_resolve'] = ticketModule['time_to_resolve'] | 0;
        } else {
            log['ticket'] = 0;
            log['ticket_total'] = 0;
            log['ticket_open'] =0;
            log['ticket_closed'] = 0;
            log['status_open'] = 0;
            log['status_pending'] =0;
            log['status_investigating'] = 0;
            log['status_escalated'] = 0;
            log['status_onhold'] =  0;
            log['status_considering'] =  0;
            log['status_resolved'] =0;
            log['status_closed'] =0;
            log['status_unknown'] = 0;

            log['type_question'] =  0;
            log['type_data_request'] =0;
            log['type_closed'] = 0;
            log['type_program_error'] = 0;
            log['type_onboarding_issue'] =  0;
            log['type_suggestion'] = 0;
            log['type_unknown'] =  0;
            log['type_defect'] = 0;
            log['type_performance'] = 0;
            log['type_dataaccess'] = 0;
            log['type_enhancement'] = 0;

            log['severity_low'] = 0;
            log['severity_medium'] = 0;
            log['severity_high'] =  0;
            log['severity_urgent'] =  0;
            log['severity_unknown'] =  0;

            log['type_by_month_question'] =  0;
            log['type_by_month_data_request'] =0;
            log['type_by_month_closed'] = 0;
            log['type_by_month_program_error'] = 0;
            log['type_by_month_onboarding_issue'] =  0;
            log['type_by_month_suggestion'] = 0;
            log['type_by_month_unknown'] =  0;
            log['type_by_month_defect'] = 0;
            log['type_by_month_performance'] = 0;

            log['severity_by_month_low'] = 0;
            log['severity_by_month_medium'] = 0;
            log['severity_by_month_high'] =  0;
            log['severity_by_month_urgent'] =  0;
            log['severity_by_month_unknown'] =  0;       

            log['time_to_resolve'] = 0;
        }

        return log;
    }

    for (company in company_list) {

        const res = await scraper(company_list[company], date, open_date);

        await database.query(
            `UPDATE log_analytics 
                SET date = '${open_date}',
                    ticket = ${res.ticket},
                    ticket_total = ${res.ticket_total},
                    ticket_open = ${res.ticket_open},
                    ticket_closed = ${res.ticket_closed},

                    status_open = ${res.status_open},
                    status_pending = ${res.status_pending},
                    status_investigating = ${res.status_investigating},
                    status_escalated = ${res.status_escalated},
                    status_onhold = ${res.status_onhold},
                    status_considering = ${res.status_considering},
                    status_resolved = ${res.status_resolved},
                    status_closed = ${res.status_closed},
                    status_unknown = ${res.status_unknown},

                    type_question = ${res.type_question},
                    type_data_request = ${res.type_data_request},
                    type_closed = ${res.type_closed},
                    type_program_error = ${res.type_program_error},
                    type_onboarding_issue = ${res.type_onboarding_issue},
                    type_performance = ${res.type_performance},
                    type_defect = ${res.type_defect},
                    type_unknown = ${res.type_unknown},
                    type_dataaccess = ${res.type_dataaccess},
                    type_enhancement = ${res.type_enhancement},

                    severity_low = ${res.severity_low},
                    severity_medium = ${res.severity_medium},
                    severity_high = ${res.severity_high},
                    severity_urgent = ${res.severity_urgent},
                    severity_unknown = ${res.severity_unknown},

                    type_by_month_question = ${res.type_by_month_question},
                    type_by_month_data_request = ${res.type_by_month_data_request},
                    type_by_month_closed = ${res.type_by_month_closed},
                    type_by_month_program_error = ${res.type_by_month_program_error},
                    type_by_month_onboarding_issue = ${res.type_by_month_onboarding_issue},
                    type_by_month_defect = ${res.type_by_month_defect},
                    type_by_month_performance = ${res.type_by_month_performance},
                    type_by_month_unknown = ${res.type_by_month_unknown},
                    type_by_month_dataaccess = ${res.type_by_month_dataaccess},
                    type_by_month_enhancement = ${res.type_by_month_enhancement},

                    severity_by_month_low = ${res.severity_by_month_low},
                    severity_by_month_medium = ${res.severity_by_month_medium},
                    severity_by_month_high = ${res.severity_by_month_high},
                    severity_by_month_urgent = ${res.severity_by_month_urgent},
                    severity_by_month_unknown = ${res.severity_by_month_unknown},

                    time_to_resolve = ${res.time_to_resolve}
            WHERE 
                date(date)='1-1-2021' AND analytic_id=${res.analytic_id};`
        );
    }
    
    console.log("Snapshot completed");
}

// Run the snapshot
// _run_('5-6-2021', '5-7-2021')
_run_('12-30-2020', '1-1-2021');

// _run_('2-28-2021', '3-1-2021');

// _run_('3-31-2021', '4-1-2021');

// _run_('4-30-2021', '5-1-2021');
