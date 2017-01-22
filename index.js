var producer = require('./lib/producer');

producer.init();

setInterval(function () {
    var request = producer.buildRequest("1.0.0.45", 3)
    producer.sendRequest(request);
}, 500);