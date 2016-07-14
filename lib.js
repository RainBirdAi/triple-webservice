var serverImpl = require('./server-impl');

function newServerInstance() {
    return serverImpl;
}

module.exports.newServerInstance = newServerInstance;

