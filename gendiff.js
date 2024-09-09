#!/usr/bin/env node

// file: gendiff.js
import path from 'path';
import { readFile, parseJson } from './fileParser.js';
import { program } from 'commander';
import { genDiff } from './fileParser.js';

program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
        const absolutePath1 = path.resolve(process.cwd(), filepath1);
        const absolutePath2 = path.resolve(process.cwd(), filepath2);

        const file1Content = readFile(absolutePath1);
        const file2Content = readFile(absolutePath2);

        console.log(file1Content);
        console.log(file2Content);

        const obj1 = parseJson(file1Content);
        const obj2 = parseJson(file2Content);

        console.log(obj1);
        console.log(obj2);

        const diff = genDiff(obj1, obj2);
        console.log(diff);
    });

program.parse(process.argv);