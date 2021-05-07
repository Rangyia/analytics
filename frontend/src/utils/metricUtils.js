/**
 * @param {*} metric Metric object to be validated if exists
 * @param {*} option Value to be selected from the metric object
 * @returns Value for the option selected
 */
exports.getNumberValue = function (metric, option) {
    if (metric == null)
        return 0;
    return (metric ? (metric[option]? metric[option] : 0) : 0)
};

/**
 * @param {*} prevDate Previous date data selected to be evaluated
 * @param {*} currDate Current date data selected to be evaluated
 * @returns Object { status, percentage }  Increased (1), decreased (-1), or stayed the same (0) status & percentage
 */
exports.getMetricStatus = function (prevDateData, selectedDateData, option = null) {
    const metricStatus = {
        status: 0,
        percentage: 0.00
    }

    if (option == null || option == "") {
        return metricStatus;
    } else {
        
        const initialNum = prevDateData[option.toLowerCase()], finalNum = selectedDateData[option.toLowerCase()];
        const valueChanged = finalNum - initialNum;
        const percentage = toPercent(initialNum, finalNum);

        metricStatus.percentage = (Math.round(percentage * 100) / 100).toFixed(2);
        metricStatus.status = (valueChanged < 0 ? 1 : -1);

        if (valueChanged > 0) {
            metricStatus.status = -1;
        } else if (valueChanged === 0) {
            metricStatus.status = 0;
        } else if (valueChanged < 0) {
            metricStatus.status = 1;
        }
        return metricStatus;
    }
};

/**
 * @param {*} a Initial number to calculate in expression.
 * @param {*} b Final number to caluclate in expression.
 * @returns |Aboslute| value of the percentage
 */
function toPercent(a, b) {
    return Math.abs(((b - a) * 100) / a);
}

/**
 * @param {*} data Daily ticket data.
 * @returns object with new tickets per month
*/
exports.SumNewTicketsPerMonth = function (data) {
    let i;
    let newTicketsPerMonth = [
        {
            "questions": 0,
            "data_requests": 0,
            "program_errors": 0,
            "onboarding_issues": 0,
            "suggestions": 0,
            "unknown": 0
        },
        {
            "questions": 0,
            "data_requests": 0,
            "program_errors": 0,
            "onboarding_issues": 0,
            "suggestions": 0,
            "unknown": 0
        },
        {
            "questions": 0,
            "data_requests": 0,
            "program_errors": 0,
            "onboarding_issues": 0,
            "suggestions": 0,
            "unknown": 0
        },
        {
            "questions": 0,
            "data_requests": 0,
            "program_errors": 0,
            "onboarding_issues": 0,
            "suggestions": 0,
            "unknown": 0
        },
        {
            "questions": 0,
            "data_requests": 0,
            "program_errors": 0,
            "onboarding_issues": 0,
            "suggestions": 0,
            "unknown": 0
        },
        {
            "questions": 0,
            "data_requests": 0,
            "program_errors": 0,
            "onboarding_issues": 0,
            "suggestions": 0,
            "unknown": 0
        },
        {
            "questions": 0,
            "data_requests": 0,
            "program_errors": 0,
            "onboarding_issues": 0,
            "suggestions": 0,
            "unknown": 0
        },
        {
            "questions": 0,
            "data_requests": 0,
            "program_errors": 0,
            "onboarding_issues": 0,
            "suggestions": 0,
            "unknown": 0
        },
        {
            "questions": 0,
            "data_requests": 0,
            "program_errors": 0,
            "onboarding_issues": 0,
            "suggestions": 0,
            "unknown": 0
        },
        {
            "questions": 0,
            "data_requests": 0,
            "program_errors": 0,
            "onboarding_issues": 0,
            "suggestions": 0,
            "unknown": 0
        },
        {
            "questions": 0,
            "data_requests": 0,
            "program_errors": 0,
            "onboarding_issues": 0,
            "suggestions": 0,
            "unknown": 0
        },
        {
            "questions": 0,
            "data_requests": 0,
            "program_errors": 0,
            "onboarding_issues": 0,
            "suggestions": 0,
            "unknown": 0
        }
    ];
    for (i = 0; i < data.length; i++) {
        let month = parseInt(data[i]["date"].split("-")[0]);
        switch (month) {
            case 1:
                newTicketsPerMonth[0]["questions"] += data[i]["type_question"];
                newTicketsPerMonth[0]["data_requests"] += data[i]["type_data_request"];
                newTicketsPerMonth[0]["program_errors"] += data[i]["type_program_error"];
                newTicketsPerMonth[0]["onboarding_issues"] += data[i]["type_onboarding_issue"];
                newTicketsPerMonth[0]["suggestions"] += data[i]["type_suggestion"];
                newTicketsPerMonth[0]["unknown"] += data[i]["type_unknown"];
                break;
            case 2:
                newTicketsPerMonth[1]["questions"] += data[i]["type_question"];
                newTicketsPerMonth[1]["data_requests"] += data[i]["type_data_request"];
                newTicketsPerMonth[1]["program_errors"] += data[i]["type_program_error"];
                newTicketsPerMonth[1]["onboarding_issues"] += data[i]["type_onboarding_issue"];
                newTicketsPerMonth[1]["suggestions"] += data[i]["type_suggestion"];
                newTicketsPerMonth[1]["unknown"] += data[i]["type_unknown"];
                break;
            case 3:
                newTicketsPerMonth[2]["questions"] += data[i]["type_question"];
                newTicketsPerMonth[2]["data_requests"] += data[i]["type_data_request"];
                newTicketsPerMonth[2]["program_errors"] += data[i]["type_program_error"];
                newTicketsPerMonth[2]["onboarding_issues"] += data[i]["type_onboarding_issue"];
                newTicketsPerMonth[2]["suggestions"] += data[i]["type_suggestion"];
                newTicketsPerMonth[2]["unknown"] += data[i]["type_unknown"];
                break;
            case 4:
                newTicketsPerMonth[3]["questions"] += data[i]["type_question"];
                newTicketsPerMonth[3]["data_requests"] += data[i]["type_data_request"];
                newTicketsPerMonth[3]["program_errors"] += data[i]["type_program_error"];
                newTicketsPerMonth[3]["onboarding_issues"] += data[i]["type_onboarding_issue"];
                newTicketsPerMonth[3]["suggestions"] += data[i]["type_suggestion"];
                newTicketsPerMonth[3]["unknown"] += data[i]["type_unknown"];
                break;
            case 5:
                newTicketsPerMonth[4]["questions"] += data[i]["type_question"];
                newTicketsPerMonth[4]["data_requests"] += data[i]["type_data_request"];
                newTicketsPerMonth[4]["program_errors"] += data[i]["type_program_error"];
                newTicketsPerMonth[4]["onboarding_issues"] += data[i]["type_onboarding_issue"];
                newTicketsPerMonth[4]["suggestions"] += data[i]["type_suggestion"];
                newTicketsPerMonth[4]["unknown"] += data[i]["type_unknown"];
                break;
            case 6:
                newTicketsPerMonth[5]["questions"] += data[i]["type_question"];
                newTicketsPerMonth[5]["data_requests"] += data[i]["type_data_request"];
                newTicketsPerMonth[5]["program_errors"] += data[i]["type_program_error"];
                newTicketsPerMonth[5]["onboarding_issues"] += data[i]["type_onboarding_issue"];
                newTicketsPerMonth[5]["suggestions"] += data[i]["type_suggestion"];
                newTicketsPerMonth[5]["unknown"] += data[i]["type_unknown"];
                break;
            case 7:
                newTicketsPerMonth[6]["questions"] += data[i]["type_question"];
                newTicketsPerMonth[6]["data_requests"] += data[i]["type_data_request"];
                newTicketsPerMonth[6]["program_errors"] += data[i]["type_program_error"];
                newTicketsPerMonth[6]["onboarding_issues"] += data[i]["type_onboarding_issue"];
                newTicketsPerMonth[6]["suggestions"] += data[i]["type_suggestion"];
                newTicketsPerMonth[6]["unknown"] += data[i]["type_unknown"];
                break;
            case 8:
                newTicketsPerMonth[7]["questions"] += data[i]["type_question"];
                newTicketsPerMonth[7]["data_requests"] += data[i]["type_data_request"];
                newTicketsPerMonth[7]["program_errors"] += data[i]["type_program_error"];
                newTicketsPerMonth[7]["onboarding_issues"] += data[i]["type_onboarding_issue"];
                newTicketsPerMonth[7]["suggestions"] += data[i]["type_suggestion"];
                newTicketsPerMonth[7]["unknown"] += data[i]["type_unknown"];
                break;
            case 9:
                newTicketsPerMonth[8]["questions"] += data[i]["type_question"];
                newTicketsPerMonth[8]["data_requests"] += data[i]["type_data_request"];
                newTicketsPerMonth[8]["program_errors"] += data[i]["type_program_error"];
                newTicketsPerMonth[8]["onboarding_issues"] += data[i]["type_onboarding_issue"];
                newTicketsPerMonth[8]["suggestions"] += data[i]["type_suggestion"];
                newTicketsPerMonth[8]["unknown"] += data[i]["type_unknown"];
                break;
            case 10:
                newTicketsPerMonth[9]["questions"] += data[i]["type_question"];
                newTicketsPerMonth[9]["data_requests"] += data[i]["type_data_request"];
                newTicketsPerMonth[9]["program_errors"] += data[i]["type_program_error"];
                newTicketsPerMonth[9]["onboarding_issues"] += data[i]["type_onboarding_issue"];
                newTicketsPerMonth[9]["suggestions"] += data[i]["type_suggestion"];
                newTicketsPerMonth[9]["unknown"] += data[i]["type_unknown"];
                break;
            case 11:
                newTicketsPerMonth[10]["questions"] += data[i]["type_question"];
                newTicketsPerMonth[10]["data_requests"] += data[i]["type_data_request"];
                newTicketsPerMonth[10]["program_errors"] += data[i]["type_program_error"];
                newTicketsPerMonth[10]["onboarding_issues"] += data[i]["type_onboarding_issue"];
                newTicketsPerMonth[10]["suggestions"] += data[i]["type_suggestion"];
                newTicketsPerMonth[10]["unknown"] += data[i]["type_unknown"];
                break;
            case 12:
                newTicketsPerMonth[11]["questions"] += data[i]["type_question"];
                newTicketsPerMonth[11]["data_requests"] += data[i]["type_data_request"];
                newTicketsPerMonth[11]["program_errors"] += data[i]["type_program_error"];
                newTicketsPerMonth[11]["onboarding_issues"] += data[i]["type_onboarding_issue"];
                newTicketsPerMonth[11]["suggestions"] += data[i]["type_suggestion"];
                newTicketsPerMonth[11]["unknown"] += data[i]["type_unknown"];
                break;
        }
    }
    return newTicketsPerMonth;
}