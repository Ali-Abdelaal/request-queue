describe("Index module:", function () {
    // set bindingTarget environment variable
    process.env.MQ_ADDRESS = "tcp://127.0.0.1:3000";
    var config = require('../config');
    const _constants = require('../constants');
    config.mq.type = _constants.mq_type.ZERO_MQ;

    var mock = {};
    mock.producer = (function () {
        var obj = function () { };

        obj.prototype.init = function (bindingTarget) { };

        obj.prototype.buildRequest = function (address, type) { };

        obj.prototype.sendRequest = function (request) { };

        return obj;
    })();

    var _index = require('../index');

    var index,
        constants;

    beforeEach(function () {
        index = _index;
        index.producer = new mock.producer();
        constants = _constants;
    });

    it('should be exist', function () {
        expect(!!index).toBe(true);
    });

    describe('init function', function () {
        it('should be exist', function () {
            expect(!!index.init).toBe(true);
        });

        it('should be init request producer', function () {
            spyOn(index.producer, 'init').and.callThrough();
            index.init();
            expect(index.producer.init).toHaveBeenCalled();
        });

        it('should handle MQ_ADDRESS not exists error', function () {
            process.env.MQ_ADDRESS = undefined;
            // IT ALSO Call producer.init ??

            spyOn(process, 'exit').and.callThrough();
            index.init();
            expect(process.exit).toHaveBeenCalled();
        });
    });

});