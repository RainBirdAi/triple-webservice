var router  = require('../router');
var convert = require('./converter');

var demoAttractions = {
    'norwich': [
        { 'attraction': 'The Cathedral', 'cost': '£3' },
        { 'attraction': 'Elm Hill', 'cost': 'Free' },
        { 'attraction': 'Norwich Castle', 'cost': '£7' }
    ],
    'london': [
        { 'attraction': 'Hyde Park', 'cost': 'Free' },
        { 'attraction': 'Madame Tussauds', 'cost': '£10' },
        { 'attraction': 'Lunch at The Shard', 'cost': '£30' }
    ],
    'cambridge': [
        { 'attraction': 'Punting on the river', 'cost': '£15' }
    ],
    'default': [
        { 'attraction': 'The Library', 'cost': 'Free' },
        { 'attraction': 'Swimming', 'cost': '£5' },
        { 'attraction': 'Cinema', 'cost': '£7' }
    ]
};

function querySubjectRelationship(isDemoKey, apiKey, subject, relationship, callback) {

    if (isDemoKey) {
        var data = demoAttractions[subject.toLowerCase()];
        callback(null, data ? data : demoAttractions['default']);
    } else {
        callback (new Error('Not implemented yet. Please use \'demokey\' rather than \'' + apiKey + '\' for now.'), null);
    }
}

router.addQuerySubjectRelationshipHandler('attractions', querySubjectRelationship);
