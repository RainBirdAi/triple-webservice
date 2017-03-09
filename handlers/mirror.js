var router  = require('../router');

var demoOptions = {};

function querySubjectRelationship(isDemoKey, apiKey, subject, relationship, data, callback) {

    // This handler will send back the query params from the request.
    // i.e. req = /blah?hello=goodbye
    // res = {'hello','goodbye'}

    var keys = Object.keys(data.query);

    keys.forEach(function(key) {
        demoOptions[key] = data.query[key];
    });

    if (isDemoKey) {
        callback(null, demoOptions);
    } else {
        callback (new Error('Not implemented yet. Please use \'demokey\' rather than \'' + apiKey + '\' for now.'), null);
    }
}

router.addQuerySubjectRelationshipHandler('mirror', querySubjectRelationship);
