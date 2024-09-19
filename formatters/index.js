import strFormat from "./stylish.js";
import plainFormat from "./plain.js";

export default function getFormatter(format) {
    switch (format) {
        case 'plain':
            return plainFormat;
        case 'stylish':
        default:
            return strFormat;
    }
}