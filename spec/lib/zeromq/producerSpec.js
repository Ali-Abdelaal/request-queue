describe("producer module", function () {
    const _constants = require('../../../lib/constants');
    var _zmq = require('zmq')
        , _winston = require('winston')
        , _producer = require('../../../lib/zeromq/producer');

    var producer,
        zmq,
        _socket = {},
        winston,
        constants;

    beforeEach(function () {
        zmq = _zmq;
        _socket.bindSync = function () { };
        producer = _producer;
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

        xit('should bind the adrress', function () {
            //TODO: can set producer.socket in code and mock it here
            spyOn(_socket, 'bindSync');
            producer.init();
            expect(_socket.bindSync).toHaveBeenCalled();
        });

    });

    describe("buildRequest function", function () {

        it('should be exist', function () {
            expect(!!producer.buildRequest).toBe(true);
        });

        it('should build valid request', function () {
            var request = producer.buildRequest()
        });

    });

});