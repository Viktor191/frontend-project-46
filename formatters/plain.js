function plainFormat(obj) {
    const iter = (data, path = '') => Object.entries(data)
        .map(([key, value]) => {
            // Определяем тип изменения по префиксу в ключе
            const keyType = key[0]; // первый символ ключа: '-' или '+'
            const actualKey = key.slice(2); // удаляем префикс '- ' или '+ '
            const newPath = path === '' ? actualKey : `${path}.${actualKey}`; // формируем путь

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                // Если значение - объект, рекурсивно обрабатываем вложенные изменения
                return iter(value, newPath);
            }

            if (keyType === '-') {
                return `Property '${newPath}' was removed`;
            }
            if (keyType === '+') {
                return `Property '${newPath}' was added with value: ${value}`;
            }
            // Если тип не 'added' и не 'deleted', пропускаем
            return [];
        })
        .flat();

    return iter(obj).join('\n');
}

export default plainFormat;