import {connect} from "./src/connect.js";
import {subscribe} from "./src/subscribe.js";
import {dispatch} from "./src/dispatch.js";

import * as config from "./src/config.js";



function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function run() {
    const ws = connect(config.feedUri)
    subscribe(ws, config.productIds)
    dispatch(ws)
    await sleep(60000)
    ws.close()
}

run();