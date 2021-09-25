import {createWriteStream} from "fs";
import {once} from 'events';

const orderColumns = ['time', 'side', 'price', 'size']
const tradeColumns = ['trade_id', 'time', 'size', 'price', 'side']

function writeRow(columns, json, stream) {
    columns.forEach((col, index) => {
        stream.write(json[col].toString())
        if (index < columns.length - 1) stream.write(',')
    })
    stream.write('\n')
}

function writeColumnHeadingRow(columns, stream) {
    stream.write(columns.join(','))
    stream.write('\n')
}

function snapshotWriter(writeStream) {
    const time = new Date().toISOString()

    const writeSide = (orders, side) => {
        orders.forEach( (order) => {
            const row = {
                time,
                side: side,
                price: order[0],
                size: order[1],
            }
            writeRow(orderColumns, row, writeStream)
        })
    }

    return (json) => {
        writeSide(json.bids, 'buy')
        writeSide(json.asks, 'sell')
    }
}

function l2updateWriter(writeStream) {
    return (json) => {
        json.changes.forEach((change) => {
            if (change[2]) { // remove updates where size is 0
                const row = {
                    time: json.time,
                    side: change[0],
                    price: change[1],
                    size: change[2],
                }
                writeRow(orderColumns, row, writeStream)
            }
        })
    }
}

function matchWriter(writeStream) {
    // TODO: recover missing trades.  track trade ids and look for skips
    return (json) => {
        writeRow(tradeColumns, json, writeStream)
    }
}

function createWriteStreams(productIds) {
    const mapping = {}
    productIds.forEach(id => {
        const orderStream = createWriteStream(`data/${id}-orders-${new Date().toISOString()}.csv`)
        writeColumnHeadingRow(orderColumns, orderStream)
        const tradeStream = createWriteStream(`data/${id}-trades-${new Date().toISOString()}.csv`)
        writeColumnHeadingRow(tradeColumns, tradeStream)
        mapping[id] = {
            snapshot: snapshotWriter(orderStream),
            l2update: l2updateWriter(orderStream),
            match: matchWriter(tradeStream)
        }
    })
    return mapping
}

function dispatch(productIds) {
    const writeMapping = createWriteStreams(productIds)
    return (msg) => {
        const json = JSON.parse(msg)
        const writeJson = writeMapping[json.product_id]?.[json.type]
        if (!writeJson) {
            console.log('unknown: ' + JSON.stringify(json, null, 2))
            return;
        }
        writeJson(json)
    }
}

export { dispatch }