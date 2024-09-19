function stylishFormat(obj, depth = 1) {
    const indentSize = 4; // Основной отступ
    const currentIndent = ' '.repeat(depth * indentSize); // Отступ для текущего уровня
    const bracketIndent = ' '.repeat((depth - 1) * indentSize); // Отступ для закрывающей скобки

    const formatEntry = ([key, value]) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Если значение - объект, рекурсивный вызов с увеличенным отступом
            return `${currentIndent}${key}: ${stylishFormat(value, depth + 1)}`;
        }
        // Если значение не объект, добавляем его с отступом
        return `${currentIndent}${key}: ${value}`;
    };

    const formattedEntries = Object.entries(obj).map(formatEntry).join('\n'); // Обрабатываем каждую запись

    return `{\n${formattedEntries}\n${bracketIndent}}`; // Закрывающая скобка
}

export default stylishFormat;