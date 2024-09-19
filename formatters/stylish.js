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
export default strFormat;