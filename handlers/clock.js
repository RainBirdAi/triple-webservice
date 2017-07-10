var router  = require('../router');
var moment = require('moment-timezone');
var converter = require('./converter');

// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
// e.g. subject = "Asia/Hong_Kong"
function querySubjectRelationship(isDemoKey, apiKey, subject, relationship, params, callback) {

    if (isDemoKey) {

        var time = moment().tz(subject);


        var result = {
            'datetime': time.format(),
            'date': time.format('DD-MM-YYYY'),
            'time': time.format('HH:mm:ss'),
            'hour': time.hour(),
            'minute': time.minute(),
            'text': converter.convertNumberToName(time.minute()) + ' minutes past ' + converter.convertHourToName(time.hour())
        };

        callback(null, result);
    } else {
        callback (new Error('Not implemented yet. Please use \'demokey\' rather than \'' + apiKey + '\' for now.'), null);
    }
}

router.addQuerySubjectRelationshipHandler('clock', querySubjectRelationship);
