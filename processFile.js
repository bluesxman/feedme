import * as fs from "fs";

const s = fs.readFileSync('data/test.json');
const a = JSON.parse(s)

console.log(a.length)