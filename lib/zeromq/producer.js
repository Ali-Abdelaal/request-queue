const constants = require('../../constants');

var zmq = require('zmq')
  , winston = require('winston');

var producer = exports;

producer.socket = zmq.socket(constants.zmq.socketType.req);

/**
 * @description Initiate socket binding 
 * to spesific tcp address and spesific port
 * @param address the socket binding target like 'tcp://127.0.0.1:3000'
 */
producer.init = function (address) {
  try {
    producer.socket.bindSync(address);
  } catch (error) {
    winston.log('info', error);
    throw new Error("Fail to bind " + address);
  }

  winston.log('info', 'Producer bound to %s', address);
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
  producer.socket.send(request);
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
producer.socket.on("message", function (reply) {
  producer.handleReply(reply);
});