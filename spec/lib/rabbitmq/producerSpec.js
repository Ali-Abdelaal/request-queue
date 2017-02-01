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
});