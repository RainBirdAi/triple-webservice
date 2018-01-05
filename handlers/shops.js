var router  = require('../router');

var demoShops = {
    'norwich': [
        {
            'name': 'Cotswold Outdoor',
            'sells': 'Clothing',
            'location': {
                'lat': 52.627049,
                'lng': 1.291902
            },
            'rating': 4,
            'reviews': [
                {
                    'id': 1,
                    'added': '2017-01-01',
                    'comment': 'Great shop!'
                },
                {
                    'id': 2,
                    'added': '2017-01-15',
                    'comment': 'Great prices!'
                }
            ]
        },
        {
            'name': 'Norwich Frame Workshop',
            'sells': 'Art',
            'location': {
                'lat': 52.630782,
                'lng': 1.291512
            },
            'rating': 5,
            'reviews': [
                {
                    'id': 3,
                    'added': '2017-11-02',
                    'comment': 'Good shop!'
                },
                {
                    'id': 4,
                    'added': '2018-01-01',
                    'comment': 'Good prices!'
                }
            ]
        },
        {
            'name': 'Jack Wills',
            'sells': 'Clothing',
            'location': {
                'lat': 52.628997,
                'lng': 1.293471
            },
            'rating': 1,
            'reviews': []

        }
    ]
};

function querySubjectRelationship(isDemoKey, apiKey, subject, relationship, data, callback) {

    if (isDemoKey) {
        var data = demoShops[subject.toLowerCase()];
        callback(null, data ? data : demoShops['norwich']);
    } else {
        callback (new Error('Not implemented yet. Please use \'demokey\' rather than \'' + apiKey + '\' for now.'), null);
    }
}

router.addQuerySubjectRelationshipHandler('shops', querySubjectRelationship);
