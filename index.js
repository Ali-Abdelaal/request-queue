const constants = require('./constants');
var config = require('./config'),
    producer = require('./lib/producer')
    , winston = require('winston');

var index = exports;
index.producer = producer;

index.init = function () {
    if (!config.mq.address) {
        winston.log('info', "Please, you should spesify 'MQ_ADDRESS' ENV VARIABLE.")
        process.exit(1);
    }

    index.producer.init(config.mq.address);
};

index.init();

// Simulate requests
setInterval(function () {
    var request = index.producer.buildRequest("1.0.0.45", constants.resolveType.ping)
    index.producer.sendRequest(request);
}, 5000);