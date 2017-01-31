const constants = require('../../constants');

var amqp = require('amqplib/callback_api')
  , winston = require('winston');

var producer = exports;

/**
 * @desc init rabbitmq server and initailzation
 * @param address used in server amqp server connection like 'amqp://localhost'
 */
producer.init = function (address) {
  producer.address = address;
  producer.channel = null;
  producer.queue = constants.rabbitmq.REQ_QUEUE;
  winston.log('info', 'Try connect to %s', address);
  amqp.connect(producer.address, producer.onServerConnected);
};

/**
 * @desc this is amqp connection callback and should create the channel
 */
producer.onServerConnected = function (err, conn) {
  if (err) {
    winston.log('info', error);
    throw new Error("Fail to connect the server");
  }

  conn.createChannel(producer.onChannelCreated);
  winston.log('info', 'The server is connected');
};

/**
 * @desc channel creation callback and should set queue specs
 */
producer.onChannelCreated = function (err, channel) {
  if (err) {
    winston.log('info', error);
    throw new Error("Fail to create channel");
  }

  producer.channel = channel;
  producer.channel.assertQueue(producer.queue, { durable: true });
};

/**
 * @desc it build the request in spesific format before push it in the queue
 * @param target is the ip or url
 * @param type is the constants.resolveType 
 */
producer.buildRequest = function (target, type) {
  var request = {
    target: target,
    resolveType: type
  };

  return JSON.stringify(request);
};

/**
 * @desc send the request in the producer queue
 */
producer.sendRequest = function (request) {
  winston.log('info', 'send request: %s', request);
  producer.channel.sendToQueue(producer.queue, new Buffer(request));
};

/*
amqp.connect('amqp://localhost', function (err, conn) {
  conn.createChannel(function (err, ch) {
    var q = 'task_queue';
    var msg = process.argv.slice(2).join(' ') || "Hello World!";

    ch.assertQueue(q, { durable: true });
    ch.sendToQueue(q, new Buffer(msg), { persistent: true });
    console.log(" [x] Sent '%s'", msg);
  });

  setTimeout(function () { conn.close(); process.exit(0) }, 500);
});
*/