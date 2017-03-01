var router  = require('../router');

var demoOptions = {};

function querySubjectRelationship(isDemoKey, apiKey, subject, relationship, params, callback) {

    // This handler will send back the query params from the request.
    // i.e. req = /blah?hello=goodbye
    // res = {'hello','goodbye'}

    var keys = Object.keys(params);

    keys.forEach(function(key) {
        demoOptions[key] = params[key];
    });

    if (isDemoKey) {
        callback(null, demoOptions);
    } else {
        callback (new Error('Not implemented yet. Please use \'demokey\' rather than \'' + apiKey + '\' for now.'), null);
    }
}

router.addQuerySubjectRelationshipHandler('mirror', querySubjectRelationship);
