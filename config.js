const constants = require('./constants');

var config = {};
config.mq = {};

config.mq.type = constants.mq_type.RABBIT_MQ;
config.mq.address = process.env.MQ_ADDRESS || undefined;

module.exports = config;