describe("producer module", function () {

    var mock = {};
    mock.socket = (function () {
        var obj = function () { };

        obj.prototype.bindSync = function (bindingTarget) { };

        obj.prototype.send = function (address, type) { };

        return obj;
    })();

    const _constants = require('../../../constants');
    var _zmq = require('zmq')
        , _winston = require('winston')
        , _producer = require('../../../lib/zeromq/producer');

    var producer,
        zmq,
        winston,
        constants;

    beforeEach(function () {
        zmq = _zmq;
        producer = _producer;
        producer.socket = new mock.socket();
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
            spyOn(producer.socket, 'bindSync');
            producer.init("adrress");
            expect(producer.socket.bindSync).toHaveBeenCalled();
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

        it('should call socket.send', function () {
            spyOn(producer.socket, 'send');
            producer.sendRequest("request");
            expect(producer.socket.send).toHaveBeenCalled();
        });
    });

    describe("handleReply function", function () {
        it('should be exist', function () {
            expect(!!producer.handleReply).toBe(true);
        });
    });

});