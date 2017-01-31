const constants = require('./constants');

var config = {};
config.mq = {};

config.mq.type = constants.mq_type.RABBIT_MQ;
//config.web.port = process.env.WEB_PORT || 9980;

module.exports = config;