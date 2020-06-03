const router  = require('../router');

const ratings = [
    { id: 1, value: 5 },
    { id: 2, value: 5 },
    { id: 3, value: 5 },
    { id: 4, value: 5 },
    { id: 5, value: 4 },
    { id: 6, value: 4 },
    { id: 7, value: 1 },
];

function querySubjectRelationship(isDemoKey, apiKey, subject, relationship, params, callback) {

    if (isDemoKey) {
        callback(null, ratings);
    } else {
        callback (new Error('Not implemented yet. Please use \'demokey\' rather than \'' + apiKey + '\' for now.'), null);
    }
}

router.addQuerySubjectRelationshipHandler('ratings', querySubjectRelationship);
