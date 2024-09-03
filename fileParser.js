import fs from 'fs';


export function readFile(filepath) {
    return fs.readFileSync(filepath, 'utf-8');
}
export function parseJson(content) {
    return JSON.parse(content);
}