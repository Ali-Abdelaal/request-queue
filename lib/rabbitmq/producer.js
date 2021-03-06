const constants = require('../../constants');

var amqp = require('amqplib/callback_api')
  , winston = require('winston');

var producer = exports;

producer.amqp = amqp;

/**
 * @desc init rabbitmq server and initailzation
 * @param address used in server amqp server connection like 'amqp://localhost'
 */
producer.init = function (address) {
  producer.address = address;
  producer.channel = null;

  winston.log('info', 'Try connect to %s', address);

  producer.amqp.connect(producer.address, producer.onServerConnected);
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
  
  var queueOptions = {
    durable: false,
    autoDelete: true,
    exclusive: false
  };

  // assert queue for requests
  producer.channel.assertQueue(constants.rabbitmq.REQ_QUEUE, queueOptions);

  //assert queue for replies
  producer.channel.assertQueue(constants.rabbitmq.REP_QUEUE, queueOptions);
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

  producer.channel.consume(constants.rabbitmq.REP_QUEUE,
    function onReply(rep) {
      producer.handleReply(rep);
    }, { noAck: true });

  producer.channel.sendToQueue(constants.rabbitmq.REQ_QUEUE,
    new Buffer(request),
    {
      replyTo: constants.rabbitmq.REP_QUEUE
    });
};

/**
 * @description handle the response from the client
 */
producer.handleReply = function (rep) {
  var reply = JSON.parse(rep.content.toString());
  var status = reply.isUp ? "UP" : "DOWN";
  winston.log("info", 'Target: %s is %s', reply.target, status);
};