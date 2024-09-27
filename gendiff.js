#!/usr/bin/env node

// file: gendiff.js //
import path from 'path';
import {readFile, parseJson} from './fileParser.js';
import {program} from 'commander';
import {genDiff} from './fileParser.js';
import {parseYaml} from "./fileParser.js";
import getFormatter from './formatters/index.js';

program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2, cmdObj) => {
        const absolutePath1 = path.resolve(process.cwd(), filepath1);// получаем абсолютный путь к файлу
        const absolutePath2 = path.resolve(process.cwd(), filepath2);

        const file1Content = readFile(absolutePath1);// читаем содержимое файла
        const file2Content = readFile(absolutePath2);
        let obj1
        let obj2
        const fileFormat = path.extname(absolutePath1);// получаем формат файла

        if (fileFormat === '.yaml' || fileFormat === '.yml') {
            obj1 = parseYaml(file1Content);
            obj2 = parseYaml(file2Content);
        }
        if (fileFormat === '.json') {
            obj1 = parseJson(file1Content);
            obj2 = parseJson(file2Content);
        }

        const diff = genDiff(obj1, obj2);// сравниваем два объекта и выводим различия в виде объекта

        const formatter = getFormatter(cmdObj.format);
        const result = formatter(diff) // форматируем вывод в соответствии с выбранным форматом
        console.log(result); // Используем выбранный формат вывода

        return result;
    });

program.parse(process.argv);

export { readFile, parseJson, parseYaml, genDiff, getFormatter };