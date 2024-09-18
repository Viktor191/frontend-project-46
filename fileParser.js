import fs from 'fs';
import yaml from 'js-yaml';

export function readFile(filepath) {// читаем файл по указанному пути и возвращаем его содержимое в виде строки
    return fs.readFileSync(filepath, 'utf-8');
}
export function parseJson(content) {// парсим содержимое файла в JSON и возвращаем объект
    return JSON.parse(content);
}
export function parseYaml(content) {// парсим содержимое файла в YAML и возвращаем объект
    return yaml.load(content);
}

function strFormat(obj, depth = 1) {
    const indentSize = 4; // Основной отступ
    const currentIndent = ' '.repeat(depth * indentSize); // Отступ для текущего уровня
    const bracketIndent = ' '.repeat((depth - 1) * indentSize); // Отступ для закрывающей скобки
    let result = '{\n';

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && value !== null) {
            // Если значение - объект, рекурсивный вызов с увеличенным отступом
            result += `${currentIndent}${key}: ${strFormat(value, depth + 1)}\n`;
        } else {
            // Если значение не объект, добавляем его с отступом
            result += `${currentIndent}${key}: ${value}\n`;
        }
    }

    result += `${bracketIndent}}`; // Закрывающая скобка

    return result;
}

export function genDiff(obj1, obj2) {
    const result = {};

    // Собираем ключи из обоих объектов
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    [...keys].sort().forEach((key) => {// сортируем ключи
        const hasInObj1 = key in obj1;
        const hasInObj2 = key in obj2;

        const isValueObj1AnObject = hasInObj1 && typeof obj1[key] === 'object' && obj1[key] !== null;// проверяем является ли значение объектом
        const isValueObj2AnObject = hasInObj2 && typeof obj2[key] === 'object' && obj2[key] !== null;

        if (isValueObj1AnObject && isValueObj2AnObject) {// если оба значения объекты, то рекурсивно вызываем функцию
            result[key] = genDiff(obj1[key], obj2[key]);
        } else if (!hasInObj1) { // если ключ есть только во втором объекте
            result[`+ ${key}`] = obj2[key];
        } else if (!hasInObj2) {// если ключ есть только в первом объекте
            result[`- ${key}`] = obj1[key];
        } else if (obj1[key] !== obj2[key]) {// если ключ есть в обоих объектах, но значения разные
            result[`- ${key}`] = obj1[key];
            result[`+ ${key}`] = obj2[key];
        } else { // если значения одинаковы
            result[`  ${key}`] = obj1[key];
        }
    });

    // Форматирование


    return strFormat(result);
}
// node ./gendiff.js ./file1.json ./file2.json
// node ./gendiff.js ./file1.yml ./file2.yml
// node ./gendiff.js ./file11.json ./file22.json