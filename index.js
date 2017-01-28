const constants = require('./lib/constants');
var producer = require('./lib/zeromq/producer')
    , winston = require('winston');

var index = exports;

index.producer = producer;

index.init = function () {
    var address = process.env.MQ_ADDRESS;
    if (!address) {
        winston.log('info', "Please, you should spesify 'MQ_ADDRESS' ENV VARIABLE.")
        process.exit(1);
    }

    index.producer.init(address);
};

index.init();

// Simulate requests
setInterval(function () {
    var request = index.producer.buildRequest("1.0.0.45", constants.resolveType.ping)
    index.producer.sendRequest(request);
}, 5000);