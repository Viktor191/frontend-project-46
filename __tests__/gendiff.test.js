import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { genDiff } from '../fileParser.js';
import { parseYaml } from '../fileParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('diff between two JSON files', () => {
    const filepath1 = path.join(__dirname, '..', 'file1.json');
    const filepath2 = path.join(__dirname, '..', 'file2.json');

    const file1 = JSON.parse(readFileSync(filepath1, 'utf-8'));
    const file2 = JSON.parse(readFileSync(filepath2, 'utf-8'));

    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff(file1, file2)).toBe(expected);
});

test('diff between two YAML files', () => {
    const filepath1 = path.join(__dirname, '..', 'file1.yml');
    const filepath2 = path.join(__dirname, '..', 'file2.yml');

    const file1 = parseYaml(readFileSync(filepath1, 'utf-8')); // Используем parseYaml для парсинга YAML
    const file2 = parseYaml(readFileSync(filepath2, 'utf-8'));

    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff(file1, file2)).toBe(expected);
});