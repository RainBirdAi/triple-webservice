var router  = require('../router');

function makePlace(name, lat, long) {
    return { 'name': name, 'latitude': lat, 'longitude': long};
}

var map = {
    'london':  makePlace('London, UK',        51.5074,  0.1278),
    'newyork': makePlace('New York, NY, USA', 40.7128, 74.0059),
    'norwich': makePlace('Norwich, UK',       52.6309,  1.2974),
    'paris':   makePlace('Paris, France',     48.8566,  2.3522)
};
var defaultData = makePlace('Default Place', 1, 2);

function querySubjectRelationship(isDemoKey, apiKey, subject, relationship, params, callback) {

    if (isDemoKey) {
        var data = map[subject.toLowerCase()];
        callback(null, data ? data : defaultData);
    } else {
        callback (new Error('Not implemented yet. Please use \'demokey\' rather than \'' + apiKey + '\' for now.'), null);
    }
}

router.addQuerySubjectRelationshipHandler('geocode', querySubjectRelationship);
