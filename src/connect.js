import WebSocket from 'ws';

function connect(feedUri) {
    const ws = new WebSocket(feedUri, {
        perMessageDeflate: false
    });

    return ws;
}

export { connect }