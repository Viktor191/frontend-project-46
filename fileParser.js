import fs from 'fs';


export function readFile(filepath) {
    return fs.readFileSync(filepath, 'utf-8');
}
export function parseJson(content) {
    return JSON.parse(content);
}

export function genDiff(obj1, obj2) {
    const result = {};

    const keys = new Set([...Object.keys(obj1).sort(), ...Object.keys(obj2).sort()]);

    keys.forEach((key) => {
        const hasInObj1 = key in obj1;
        const hasInObj2 = key in obj2;
        const areValuesEqual = obj1[key] === obj2[key];

        if (!hasInObj1) {
            result[`+ ${key}`] = obj2[key];
        } else if (!hasInObj2) {
            result[`- ${key}`] = obj1[key];
        } else if (!areValuesEqual) {
            result[`- ${key}`] = obj1[key];
            result[`+ ${key}`] = obj2[key];
        } else {
            result[`  ${key}`] = obj1[key];
        }
    });
    function strFormat(obj) {
        let result = '{\n';

        for (const [key, value] of Object.entries(obj)) {
            result += `  ${key}: ${value}\n`;
        }

        result += '}';
        return result;
    }

    return strFormat(result);
}
