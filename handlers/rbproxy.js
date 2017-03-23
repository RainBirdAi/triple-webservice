var api = require('yolapi');

function process(req, res) {
    res.setHeader('Content-Type', 'application/json');

    var data = req.body;

    if (!data || !data.start) {
        return res.send({'error': 'Expected \'start\' information in the post body.'});
    }

    var sessionData = data.start;
    if (!sessionData.length || sessionData.length !== 3) {
        return res.send({'error': 'Expected 3 pieces of information for start (api-key,km-id, endpoint-url).'});
    }

    var session = new api.session(sessionData[0], sessionData[1], sessionData[2]);

    session.start(function(err) {
        if (err) {
            res.send({'error': 'Error calling start.', 'details': err});
        } else {
            processInject(session, data, res);
        }
    });

}

function processInject(session, data ,res) {
    if (data.inject) {

        session.inject(data.inject, function(err) {
            if (err) {
                res.send({'error': 'Error during inject.', 'detauls': err});
            } else {
                processQuery(session, data, res);
            }
        });

    } else {
        processQuery(session, data, res);
    }
}

function processQuery(session, data, res) {
    if (!data.query) {
        return res.send({'message': 'No errors. No query found.'});
    }

    session.query(data.query, function(err, result) {
        if (err) {
            return res.send({'error': 'Error during query.', 'details': err});
        }

        res.send(result);
    });

}

module.exports.process = process;
