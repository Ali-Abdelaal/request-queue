const constants = require('./lib/constants');
var producer = require('./lib/zeromq/producer');

var index = exports;

index.init = function () {
    var bindingTarget = process.env.bindingTarget;
    if (!bindingTarget) {
        throw new Error("Please spesify your binding target via bindingTarget environment variable");
    }
    
    producer.init(bindingTarget);
};

index.init();

setInterval(function () {
    var request = producer.buildRequest("1.0.0.45", constants.resolveType.ping)
    producer.sendRequest(request);
}, 500);