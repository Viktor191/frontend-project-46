function plainFormat(obj) {
    const iter = (data, path = '') => {
        return Object.entries(data).flatMap(([key, value]) => {
            const keyType = key[0] === '-' || key[0] === '+' ? key[0] : ' ';
            const actualKey = keyType !== ' ' ? key.slice(2) : key;

            const newPath = path === '' ? actualKey : `${path}.${actualKey}`;

            // Если значение - объект, рекурсивно обрабатываем вложенные изменения
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                return iter(value, newPath); // рекурсивный вызов
            }

            return generateMessage(keyType, newPath, value);
        });
    };

    const generateMessage = (keyType, newPath, value) => {
        switch (keyType) {
            case '-':
                return `Property '${newPath}' was removed`;
            case '+':
                return `Property '${newPath}' was added with value: ${value}`;
            default:
                return [];
        }
    };

    return iter(obj).join('\n');
}

export default plainFormat;