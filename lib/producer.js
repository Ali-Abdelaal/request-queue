const constants = require('./constants');

var zmq = require('zmq')
  , _socket = zmq.socket(constants.zmq.socketType.req)
  , winston = require('winston');

var producer = exports;

/**
 * @description Initiate socket binding 
 * to spesific tcp address and spesific port
 */
producer.init = function () {
  _socket.bindSync('tcp://127.0.0.1:3000');
  winston.log('info', 'Producer bound to port 3000');
};

/**
 * @description Send a request to the client
 */
producer.sendRequest = function (request) {
  winston.log('info', 'sending message: %s', request);
  _socket.send(request);
};

/**
 * @description handle the response from the client
 */
producer.handleReply = function (reply) {
  winston.log('info', 'Response message: %s', reply.toString("utf8"));
};

// Add a callback for the event that is invoked when we receive a message.
_socket.on("message", function (reply) {
  producer.handleReply(reply);
});