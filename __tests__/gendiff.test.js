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

    // Ожидаемый результат (пример)
    const expected = `{
    common: {
        + follow: false
          setting1: Value 1
        - setting2: 200
        - setting3: true
        + setting3: null
        + setting4: blah blah
        + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
                - wow: 
                + wow: so much
            }
              key: value
            + ops: vops
        }
    }
    group1: {
        - baz: bas
        + baz: bars
          foo: bar
        - nest: {
            key: value
        }
        + nest: str
    }
    - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
    + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

    // Получаем форматтер
    const formatter = getFormatter('stylish');// Получаем форматтер для стиля "stylish" (или другого)

    // Генерируем diff и форматируем результат
    const diff = genDiff(file1, file2);
    const result = formatter(diff);
    console.log(result);
    // Сравниваем результат с эталоном
    expect(result).toEqual(expected);
});
//    expect(result).toEqual(expected);  // Используем toEqual для сравнения строк