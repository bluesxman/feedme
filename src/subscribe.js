function subscribe(ws, productIds, channels) {
    const request = {
        "type": "subscribe",
        "product_ids": productIds,
        "channels": channels
    }

    ws.on('open', function open() {
        ws.send(JSON.stringify(request));
    });

    return ws;
}

export { subscribe }