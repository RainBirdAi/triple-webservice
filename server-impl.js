var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();

var reframe = require('triple-reframe');

var router = require('./router');

app.disable('x-powered-by');
var server = http.createServer(app);

app.use(bodyParser.urlencoded({'extended': false}));
app.use(bodyParser.json());

function processQuery(apiKey, subject, relationship, data, req, res) {

    router.querySubjectRelationship(apiKey, subject, relationship, data, function(err, result) {
        if (err) {
            console.log('res-error   - ' + err.message);
            res.status(400).send({'status': 'ERROR',
                'message':  err.message });
        } else {
            console.log('res-success - ' + subject + ' - ' + relationship);
            res.status(200).send({ 'status': 'OK',
                'data':   result });
        }
    });
}

function processReframe(subject, relationship, object, res) {

    reframe.reframe(subject, relationship, object, function(err, data) {
        if(err) {
            res.status(400).send({'status': 'ERROR', 'message': err});
        } else {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({'status': 'OK', 'data': data}, null, 3));
        }
    });
}

function senddata(res, data) {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({'status': 'OK', 'data': data}, null, 3));
}

app.get('/query/:key/:subject/:relationship', function(req, res) {
    processQuery(req.params.key, req.params.subject, req.params.relationship, req, res);
});

var rdf = require('corefoo-rdf');
app.get('/static/namequery/:subject/:relationship', function(req, res) {
    rdf.processLabelQuery(req.params.subject, req.params.relationship, function(err, data) {

        if (err) {
            console.log('res-error   - ' + err.message);
            res.status(400).send({'status': 'ERROR',
                'message':  err.message });
        } else {
            console.log('res-success - ' + req.params.subject + ' - ' + req.params.relationship);
            senddata(res,data);
        }
    });
});

app.get('/:key/query/:subject/:relationship', function(req, res) {

    var data = {
        'query': req.query,
        'body': {}
    };

    processQuery(req.params.key, req.params.subject, req.params.relationship, data, req, res);
});

// Specific endpoint for the clock
// The timezone is in the format Europe/London
// Therefore has a part A and part B.
app.get('/:key/query/:subjectPartA/:subjectPartB/clock', function(req, res) {

    var data = {
        'query': req.query,
        'body': {}
    };

    var subject = req.params.subjectPartA + '/' + req.params.subjectPartB;

    processQuery(req.params.key, subject, 'clock', data, req, res);
});

app.get('/:key/securequery/:subject/:relationship', function(req, res) {

    var authorization = req.header('Authorization');

    if ((typeof authorization == 'undefined')) {
        res.status(401).send({'status': 'ERROR', 'message': 'Missing Authorization header!'});
    } else {
        var data = {
            'query': req.query,
            'body': {}
        };

        processQuery(req.params.key, req.params.subject, req.params.relationship, data, req, res);
    }
});

app.post('/:key/securequery/:subject/:relationship', function(req, res) {

    var authorization = req.header('Authorization');

    if ((typeof authorization == 'undefined')) {
        res.status(401).send({'status': 'ERROR', 'message': 'Missing Authorization header!'});
    } else {
        var data = {
            'query': req.query,
            'body': req.body
        };

        processQuery(req.params.key, req.params.subject, req.params.relationship, data, req, res);
    }
});

app.post('/:key/query/:subject/:relationship', function(req, res) {

    var data = {
        'query': req.query,
        'body': req.body
    };

    processQuery(req.params.key, req.params.subject, req.params.relationship, data, req, res);
});

app.post('/rbproxy',  require('./handlers/rbproxy').process);


app.get('/reframe/:subject/:relationship/:object', function(req, res) {

    processReframe(req.params.subject, req.params.relationship, req.params.object, res);
});

var listeningPort = 8888;

module.exports = {
    'port': function(portNumber) {
        listeningPort = portNumber;
        return this;
    },
    'start': function(callback) {
        server.listen(listeningPort, function () {
            console.log('Listening on :' + listeningPort);
            if (callback) {
                callback(null, null);
            }
        });
    },
    'stop': function(callback) {
        server.close(callback);
    }
};


