var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();


var router = require('./router');

app.disable('x-powered-by');
var server = http.createServer(app);

app.use(bodyParser.urlencoded({'extended': false}));
app.use(bodyParser.json());

function processQuery(apiKey, subject, relationship, req, res) {

    router.querySubjectRelationship(apiKey, subject, relationship, function(err, data) {
        if (err) {
            console.log('res-error   - ' + err.message);
            res.status(400).send({'status': 'ERROR',
                'message':  err.message });
        } else {
            console.log('res-success - ' + subject + ' - ' + relationship);
            res.status(200).send({ 'status': 'OK',
                'data':   data });
        }
    });
}

app.get('/query/:key/:subject/:relationship', function(req, res) {
    processQuery(req.params.key, req.params.subject, req.params.relationship, req, res);
});

app.get('/:key/query/:subject/:relationship', function(req, res) {
    processQuery(req.params.key, req.params.subject, req.params.relationship, req, res);
});

var listeningPort = 8888;

module.exports = {
    'port': function(portNumber) {
        listeningPort = portNumber;
        return this;
    },
    'start': function() {
        server.listen(listeningPort, function () {
            console.log('Listening on :' + listeningPort);
        });
    },
    'stop': function(callback) {
        server.close(callback);
    }
};


