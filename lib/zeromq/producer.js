const constants = require('../constants');

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
 * @description Buid json object and convert it to stringify
 * @param target : url or ip [address] 
 * @param type : get:1 or post::2 or ping:3
 * @return string of request object
 */
producer.buildRequest = function (target, type) {
  var request = {
    target: target,
    resolveType: type
  };

  return JSON.stringify(request);
};

/**
 * @description Send a request to the client
 */
producer.sendRequest = function (request) {
  winston.log('info', 'send request: %s', request);
  _socket.send(request);
};

/**
 * @description handle the response from the client
 */
producer.handleReply = function (rep) {
  var reply = JSON.parse(rep);
  var status = reply.isUp ? "UP" : "DOWN";
  winston.log("info", 'Target: %s is %s', reply.target, status);
};

// Add a callback for the event that is invoked when we receive a message.
_socket.on("message", function (reply) {
  producer.handleReply(reply);
});