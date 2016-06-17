function toNumber(text, maxNumber) {
    var divisor = maxNumber + 1
    var runningTotal = 0;
    text = text.toLowerCase();

    for (var i = 0, len = text.length; i < len; i++) {
        runningTotal += text.charCodeAt(i);
    }

    return runningTotal % divisor;
}

module.exports.toNumber = toNumber;
