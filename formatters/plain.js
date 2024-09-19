function plainFormat(obj) {
    const iter = (data, path = '') => Object.entries(data) // Преобразуем объект в массив ключей и значений
        .map(([key, value]) => {
            // Определяем тип изменения по префиксу в ключе
            let keyType = ' ';// тип изменения по умолчанию - неизменен
            let actualKey = key;// ключ без префикса

            // Если ключ начинается с '-' или '+', определяем тип изменения и обрезаем префикс
            if (key[0] === '-' || key[0] === '+') {
                keyType = key[0];
                actualKey = key.slice(2); // удаляем префикс '- ' или '+ '
            }

            const newPath = path === '' ? actualKey : `${path}.${actualKey}`; // формируем путь к текущему ключу в виде строки

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                // Если значение - объект, рекурсивно обрабатываем вложенные изменения
                return iter(value, newPath); // рекурсивный вызов с новым путем
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