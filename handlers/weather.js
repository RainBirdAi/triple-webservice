var router  = require('../router');
var convert = require('./converter');

var demoOptions = [
    { 'conditions': 'sunny',   'temperature': 30 },
    { 'conditions': 'cloudy',  'temperature': 20 },
    { 'conditions': 'raining', 'temperature': 10 }
];

function querySubjectRelationship(isDemoKey, apiKey, subject, relationship, callback) {

    if (isDemoKey) {
        callback(null, demoOptions[convert.toNumber(subject, 2)]);
    } else {
        callback (new Error('Not implemented yet. Please use \'demokey\' rather than \'' + apiKey + '\' for now.'), null);
    }
}

router.addQuerySubjectRelationshipHandler('weather', querySubjectRelationship);
