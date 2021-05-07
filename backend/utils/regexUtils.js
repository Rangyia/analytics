// Valiates if the string is valid
exports.isValidParam = function (str = null) {
    if (str == null || str == undefined || str == "") {
        return false;
    }
    else { 
        return true;
    }
};