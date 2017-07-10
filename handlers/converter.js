function toNumber(text, maxNumber) {
    var divisor = maxNumber + 1
    var runningTotal = 0;
    text = text.toLowerCase();

    for (var i = 0, len = text.length; i < len; i++) {
        runningTotal += text.charCodeAt(i);
    }

    return runningTotal % divisor;
}

// Taken from http://jsfiddle.net/jfriend00/EmALf/
function convertHourToName(num) {
    if (num > 12) {
        num -= 12;
    }
    return convertNumberToName(num);
}

function convertNumberToName(num) {
    var lowNames = ["zero", "one", "two", "three",
        "four", "five", "six", "seven", "eight", "nine",
        "ten", "eleven", "twelve", "thirteen", "fourteen",
        "fifteen", "sixteen", "seventeen",
        "eighteen", "nineteen"];
    var tensNames = ["twenty", "thirty", "forty", "fifty",
        "sixty", "seventy", "eighty", "ninety"];
    var tens, ones, result;
    if (num < lowNames.length) {
        result = lowNames[num];
    } else {
        tens = Math.floor(num / 10);
        ones = num % 10;
        if (tens <= 9) {
            result = tensNames[tens - 2];
            if (ones > 0) {
                result += " " + lowNames[ones];
            }
        } else {
            result = "unknown"
        }
    }
    return result;
}

module.exports.toNumber = toNumber;
module.exports.convertHourToName = convertHourToName;
module.exports.convertNumberToName = convertNumberToName;
