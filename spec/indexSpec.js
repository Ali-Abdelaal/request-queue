describe("Index module", function () {
    process.env.bindingTarget = "tcp://127.0.0.1:3000";

    const _constants = require('../lib/constants');
    var _index = require('../index'),
        _producer = require('../lib/zeromq/producer');

    var index,
        producer,
        constants;

    beforeEach(function () {
        index = _index;
        producer = _producer;
        constants = _constants;
    });

    it('should be exist', function () {
        expect(!!index).toBe(true);
    });

    describe('init function', function () {
        it('should be exist', function () {
            expect(!!index.init).toBe(true);
        });

        it('should be init producer mq', function () {
            spyOn(producer, 'init');
            index.init();
            expect(producer.init).toHaveBeenCalled();
        });
    });

});