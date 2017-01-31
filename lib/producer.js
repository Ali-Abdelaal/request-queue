const constants = require('../constants');
var config = require('../config')
    , winston = require('winston');

var producer = {};

// initalize MQ producer based on configuration type
// default mq is rabbitmq
if (config.mq.type === constants.mq_type.ZERO_MQ) {
    producer = require('../lib/zeromq/producer');
} else {
    producer = require('../lib/rabbitmq/producer');
}

module.exports = producer;