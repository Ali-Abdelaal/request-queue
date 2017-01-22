var producer = require('./lib/producer');

producer.init();

setInterval(function () {
    var request = producer.buildRequest("127.0.0.1", "ping")
    producer.sendRequest(request);
}, 500);