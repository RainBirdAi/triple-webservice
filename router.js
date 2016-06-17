module.exports.querySubjectRelationship = querySubjectRelationship;
module.exports.addQuerySubjectRelationshipHandler = addQuerySubjectRelationshipHandler;

var querySubjectRelationshipHandlers = {};
var weather = require('./handlers/weather');
require('./handlers/geo');


function querySubjectRelationship (apiKey, subject, relationship, callback) {
    var demokey = apiKey && apiKey.toLowerCase() === 'demokey';
    var handler = querySubjectRelationshipHandlers[relationship];

    if (handler) {
        handler(demokey, apiKey, subject, relationship, function(err, data) {
            callback(err, data);
        });
    } else {
        callback(new Error('Relationship \'' + relationship + '\' has no handlers.'), null);
    }
}

function addQuerySubjectRelationshipHandler (relationshipName, implementation) {
    querySubjectRelationshipHandlers[relationshipName] = implementation;
}
