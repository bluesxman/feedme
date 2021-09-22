function subscribe(ws, productIds) {
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

export { subscribe }