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

module.exports = {
    zmq: zmq,
    resolveType: resolveType
}