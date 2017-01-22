const constants = require('./lib/constants');
var producer = require('./lib/zeromq/producer');

producer.init();

setInterval(function () {
    var request = producer.buildRequest("1.0.0.45", constants.resolveType.ping)
    producer.sendRequest(request);
}, 500);