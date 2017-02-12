describe("rabbitmq producer module", function () {

    var mock = {};
    mock.amqp = (function () {
        var obj = function () { };

        obj.prototype.connect = function (address, callback) { };

        return obj;
    })();

    const _constants = require('../../../constants');
    var _rabbitmq = require('zmq')
        , _winston = require('winston')
        , _producer = require('../../../lib/rabbitmq/producer');

    var producer,
        rabbitmq,
        winston,
        constants;

    beforeEach(function () {
        rabbitmq = _rabbitmq;
        producer = _producer;
        producer.amqp = new mock.amqp();
        winston = _winston;
        constants = _constants;
    });

    it('should be exist', function () {
        expect(!!producer).toBe(true);
    });

    describe("init function", function () {
        it('should be exist', function () {
            expect(!!producer.init).toBe(true);
        });

        it('should bind the adrress', function () {
            spyOn(producer.amqp, 'connect');
            producer.init("adrress");
            expect(producer.amqp.connect).toHaveBeenCalled();
        });
    });

    describe("onServerConnected function", function () {
        it('should be exist', function () {
            expect(!!producer.onServerConnected).toBe(true);
        });

        it('should handle success', function () {
            var conn = {
                createChannel: function (callback) {
                }
            };
            spyOn(conn, 'createChannel');
            producer.onServerConnected(undefined, conn);
            expect(conn.createChannel).toHaveBeenCalled();
        });

        it('should handle error', function () {
            expect(function () {
                producer.onServerConnected('error', undefined);
            }).toThrow();
        });
    });

    describe("onChannelCreated function", function () {
        it('should be exist', function () {
            expect(!!producer.onChannelCreated).toBe(true);
        });

        it('should handle success', function () {
            var channel = {
                assertQueue: function (queueType, options) {
                }
            };

            producer.onChannelCreated(undefined, channel);
            expect(producer.channel).toBe(channel);

            spyOn(producer.channel, 'assertQueue').and.callThrough();
            producer.onChannelCreated(undefined, channel);
            expect(producer.channel.assertQueue).toHaveBeenCalledTimes(2);
        });

        it('should handle error', function () {
            expect(function () {
                producer.onChannelCreated('error', undefined);
            }).toThrow();
        });
    });

    describe("buildRequest function", function () {
        it('should be exist', function () {
            expect(!!producer.buildRequest).toBe(true);
        });

        it('should build valid request', function () {
            var expectedResult = JSON.stringify({
                target: 'target',
                resolveType: 'type'
            });

            var result = producer.buildRequest('target', 'type');

            expect(result).toEqual(expectedResult);
        });
    });

    describe("sendRequest function", function () {
        it('should be exist', function () {
            expect(!!producer.sendRequest).toBe(true);
        });

        it('should handle request sending', function () {
            producer.channel = {
                consume: function (name, callback, options) {
                },
                sendToQueue: function (name, request, options) {
                }
            };

            spyOn(producer.channel, 'consume');
            spyOn(producer.channel, 'sendToQueue');
            producer.sendRequest("request");
            expect(producer.channel.consume).toHaveBeenCalled();
            expect(producer.channel.sendToQueue).toHaveBeenCalled();
        });
    });

    describe("handleReply function", function () {
        it('should be exist', function () {
            expect(!!producer.handleReply).toBe(true);
        });
    });

});