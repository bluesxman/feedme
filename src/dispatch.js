import { pipeline } from 'stream/promises'
import {createWriteStream} from "fs";
import {createWebSocketStream} from 'ws';
import * as zlib from "zlib";



async function dispatch(ws) {
    const stream = createWebSocketStream(ws, { encoding: 'utf8' });
    await pipeline(
        stream,
        zlib.createGzip(),
        createWriteStream('data/test2.txt.gz')
    )
}

export { dispatch }