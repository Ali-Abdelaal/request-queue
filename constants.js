
var mq_type = {
    ZERO_MQ: 'zeromq',
    RABBIT_MQ: 'rabbitmq'
};

var zmq = {
    socketType: {
        push: "push",
        pull: "pull",
        req: "req",
        rep: "rep"
    },
};

var resolveType = {
    httpGet: 1,
    httpPost: 2,
    ping: 3,
};

var rabbitmq = {
    REQ_QUEUE: 'request_queue',
    REP_QUEUE: 'reply_queue',
};

module.exports = {
    mq_type: mq_type,
    zmq: zmq,
    resolveType: resolveType,
    rabbitmq: rabbitmq
};