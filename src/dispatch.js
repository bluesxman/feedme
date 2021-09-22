import { pipeline } from 'stream/promises'
import {createWriteStream} from "fs";
import * as zlib from "zlib";

async function dispatch(sourceStream) {
    await pipeline(
        sourceStream,
        zlib.createGzip(),
        createWriteStream('data/test3.txt.gz')
    )
}

export { dispatch }