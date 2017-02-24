var router  = require('../router');

function querySubjectRelationship(isDemoKey, apiKey, subject, relationship, params, callback) {

    var traveltime;

    switch (params['mode']) {
        case 'driving':
            traveltime = 60;
            break;
        case 'walking':
            traveltime = 600;
            break;
        default:
            traveltime = 6000;
    }

    if (isDemoKey) {
        callback(null, {'seconds': traveltime});
    } else {
        callback (new Error('Not implemented yet. Please use \'demokey\' rather than \'' + apiKey + '\' for now.'), null);
    }
}

router.addQuerySubjectRelationshipHandler('traveltime', querySubjectRelationship);
