import WebSocket from 'ws';



function subscribe(productIds) {
    const ws = new WebSocket('wss://ws-feed.pro.coinbase.com', {
        perMessageDeflate: false
    });

    const request = {
        "type": "subscribe",
        "product_ids": productIds,
        "channels": [
            "level2",
            "heartbeat",
            {
                "name": "ticker",
                "product_ids": productIds
            }
        ]
    }

    ws.on('open', function open() {
        ws.send(JSON.stringify(request));
    });

    return ws;
}

async function run() {
    const ws = subscribe(['BTC-USD'])
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
}

run();