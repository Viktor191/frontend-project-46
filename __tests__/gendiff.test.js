import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import getFormatter from '../formatters/index.js'; // Для получения форматтера
import {genDiff, parseJson, parseYaml} from '../fileParser.js'; // Ваши функции парсинга

// Получаем путь до папки __fixtures__
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

// Читаем данные из файлов
const readFile = (filepath) => readFileSync(filepath, 'utf-8');

// Тест для стиля "stylish"
test('diff between two JSON files (stylish)', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    // Парсим файлы
    const file1 = parseJson(readFile(filepath1));
    const file2 = parseJson(readFile(filepath2));

    // Ожидаемый результат из файла
    const expected = readFile(getFixturePath('expected_stylish.txt')).trim();

    // Получаем форматтер
    const formatter = getFormatter('stylish');

    // Генерируем diff и форматируем результат
    const diff = genDiff(file1, file2);
    const result = formatter(diff);

    // Сравниваем результат с эталоном
    expect(result).toEqual(expected);
});

// Тест для стиля "plain"
test('diff between two JSON files (plain)', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    // Парсим файлы
    const file1 = parseJson(readFile(filepath1));
    const file2 = parseJson(readFile(filepath2));

    // Ожидаемый результат из файла
    const expected = readFile(getFixturePath('expected_plain.txt')).trim();

    // Получаем форматтер
    const formatter = getFormatter('plain');

    // Генерируем diff и форматируем результат
    const diff = genDiff(file1, file2);
    const result = formatter(diff);

    // Сравниваем результат с эталоном
    expect(result).toEqual(expected);
});

// Тест для стиля "json"
test('diff between two JSON files (json)', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    // Парсим файлы
    const file1 = parseJson(readFile(filepath1));
    const file2 = parseJson(readFile(filepath2));

    // Ожидаемый результат из файла
    const expected = readFile(getFixturePath('expected_json.txt')).trim();

    // Получаем форматтер
    const formatter = getFormatter('json');

    // Генерируем diff и форматируем результат
    const diff = genDiff(file1, file2);
    const result = formatter(diff);

    // Сравниваем результат с эталоном
    expect(result).toEqual(expected);
});
//    expect(result).toEqual(expected);  // Используем toEqual для сравнения строк