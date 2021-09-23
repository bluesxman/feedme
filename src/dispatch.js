import {createWriteStream} from "fs";

function createWriteStreams(productIds) {
    const mapping = {}
    productIds.forEach(id => {
        mapping[id] = createWriteStream(`data/${id}-${new Date().toISOString()}.json`)
    })
    return mapping
}

function dispatch(productIds) {
    const writeMapping = createWriteStreams(productIds)
    return async (msg) => {
        const message = JSON.parse(msg)
        if (!message.product_id) {
            console.log('unknown: ' + message)
            return;
        }
        const writeStream = writeMapping[message.product_id]

        if (!await writeStream.write(`${msg},\n`)) {
            await writeStream.once('drain', () => {
                console.log('drained')
            })
        }
    }
}

export { dispatch }