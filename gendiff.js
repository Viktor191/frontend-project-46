#!/usr/bin/env node

// file: gendiff.js
import path from 'path';
import {readFile, parseJson} from './fileParser.js';
import {program} from 'commander';
import {genDiff} from './fileParser.js';
import {parseYaml} from "./fileParser.js";

program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
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

        console.log('fileFormat: ' + fileFormat);
        console.log(file1Content);
        console.log(file2Content);

        console.log(obj1);
        console.log(obj2);

        const diff = genDiff(obj1, obj2);// сравниваем два объекта и выводим различия
        console.log(diff);
    });

program.parse(process.argv);