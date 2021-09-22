import * as fs from 'fs/promises'

async function open(filename) {
    let filehandle;
    try {
        filehandle = await open(filename, 'r');
    } finally {
        await filehandle?.close();
    }
}

async function writeMessage(msg) {

}

module.exports = {writeMessage}