module.exports.querySubjectRelationship = querySubjectRelationship;
module.exports.addQuerySubjectRelationshipHandler = addQuerySubjectRelationshipHandler;

var querySubjectRelationshipHandlers = {};
var weather = require('./handlers/weather');
require('./handlers/geo');
require('./handlers/attractions');
require('./handlers/mirror');
require('./handlers/traveltime');
require('./handlers/clock');

function querySubjectRelationship (apiKey, subject, relationship, data, callback) {
    var demokey = apiKey && apiKey.toLowerCase() === 'demokey';
    var handler = querySubjectRelationshipHandlers[relationship];

    if (handler) {
        handler(demokey, apiKey, subject, relationship, data, function(err, result) {
            callback(err, result);
        });
    } else {
        callback(new Error('Relationship \'' + relationship + '\' has no handlers.'), null);
    }
}

function addQuerySubjectRelationshipHandler (relationshipName, implementation) {
    querySubjectRelationshipHandlers[relationshipName] = implementation;
}

