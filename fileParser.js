import fs from 'fs';
import yaml from 'js-yaml';

export function readFile(filepath) {// читаем файл по указанному пути и возвращаем его содержимое в виде строки
    return fs.readFileSync(filepath, 'utf-8');
}
export function parseJson(content) {// парсим содержимое файла в JSON
    return JSON.parse(content);
}
export function parseYaml(content) {// парсим содержимое файла в YAML
    return yaml.load(content);
}

export function genDiff(obj1, obj2) {
    const result = {};

    const keys = new Set([...Object.keys(obj1).sort(), ...Object.keys(obj2).sort()]);
    // объединяем ключи из обоих объектов и сортируем их по алфавиту

    keys.forEach((key) => {// проходимся по ключам и сравниваем значения
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
    function strFormat(obj) {// форматируем строку для вывода в консоль
        let result = '{\n';

        for (const [key, value] of Object.entries(obj)) {
            result += `  ${key}: ${value}\n`;
        }

        result += '}';
        return result;
    }

    return strFormat(result);
}
// node ./gendiff.js ./file1.json ./file2.json
// node ./gendiff.js ./file1.yml ./file2.yml