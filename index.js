import {connect} from "./src/connect.js";
import {subscribe} from "./src/subscribe.js";
import {dispatch} from "./src/dispatch.js";
import * as config from "./src/config.js";
import {createWebSocketStream} from "ws";

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function run() {
    const ws = connect(config.feedUri)
    subscribe(ws, config.productIds)
    const stream = createWebSocketStream(ws, { encoding: 'utf8' });
    dispatch(stream)
    await sleep(5000)
    ws.close()
}

run();