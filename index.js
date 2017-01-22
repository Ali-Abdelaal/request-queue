var producer = require('./lib/producer');

producer.init();

setInterval(function () {
    producer.sendRequest('some work');
}, 500);