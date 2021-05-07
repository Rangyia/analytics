/**
 * 
 * @param {*} date Date used to format the date (accepts date object or string value of date)
 * @returns String date in form of 'MM-DD-YYYY'
 * @throws Invalid type error
 */
 exports.formatDate = function (date = null) {
    if (date == null) {
        date = new Date();
        return (date.getMonth() + 1) + "-" + (date.getDate()) + "-" + date.getFullYear()
    } else {
        if (typeof date === "object") {
            return (date.getMonth() + 1) + "-" + (date.getDate()) + "-" + date.getFullYear();
        } else if (typeof date === "string") {
            let strDate = new Date(date)
            return (strDate.getMonth() + 1) + "-" + (strDate.getDate()) + "-" + strDate.getFullYear();
        }
    }
    throw new TypeError(`Date is not of valid type: ${typeof date} | ${date}`)
};

exports.setMonthLabels = function (numMonths, data) {
    var labels = [] 
    let i;
    for (i = numMonths-1; i >= 0; i--) {
        let date = data["analytics"][i]["date"];
        labels.push(getMonthFromDate(date));
    }
    return labels;
}

exports.getMonthFromDate = function (dateString) {
    let month = parseInt(dateString.split("-")[0]);
    let monthString = "None";
    switch (month) {
        case 1:
            monthString = "January"
            break;
        case 2:
            monthString = "February"
            break;
        case 3:
            monthString = "March"
            break;
        case 4:
            monthString = "April"
            break;
        case 5:
            monthString = "May"
            break;
        case 6:
            monthString = "June"
            break;
        case 7:
            monthString = "July"
            break;
        case 8:
            monthString = "August"
            break;
        case 9:
            monthString = "September"
            break;
        case 10:
            monthString = "October"
            break;
        case 11:
            monthString = "November"
            break;
        case 12:
            monthString = "December"
            break;
    }
    return monthString;
};

function getMonthFromDate (dateString) {
    let month = parseInt(dateString.split("-")[0]);
    let monthString = "None";
    switch (month) {
        case 1:
            monthString = "January"
            break;
        case 2:
            monthString = "February"
            break;
        case 3:
            monthString = "March"
            break;
        case 4:
            monthString = "April"
            break;
        case 5:
            monthString = "May"
            break;
        case 6:
            monthString = "June"
            break;
        case 7:
            monthString = "July"
            break;
        case 8:
            monthString = "August"
            break;
        case 9:
            monthString = "September"
            break;
        case 10:
            monthString = "October"
            break;
        case 11:
            monthString = "November"
            break;
        case 12:
            monthString = "December"
            break;
    }
    return monthString;
}

