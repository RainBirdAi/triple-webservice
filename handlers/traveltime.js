var router  = require('../router');

function querySubjectRelationship(isDemoKey, apiKey, subject, relationship, data, callback) {

    var traveltime;

    switch (data.query['mode']) {
        case 'driving':
            traveltime = 60;
            break;
        case 'walking':
            traveltime = 600;
            break;
        default:
            traveltime = 6000;
    }

    if (typeof data.body['multiplier'] == 'number' && data.body['multiplier'] > 0) {
        traveltime = traveltime * data.body['multiplier']
    }

    if (isDemoKey) {
        callback(null, {'seconds': traveltime});
    } else {
        callback (new Error('Not implemented yet. Please use \'demokey\' rather than \'' + apiKey + '\' for now.'), null);
    }
}

router.addQuerySubjectRelationshipHandler('traveltime', querySubjectRelationship);
