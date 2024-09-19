import stylishFormat from "./stylish.js";
import plainFormat from "./plain.js";
import jsonFormat from "./json.js";

export default function getFormatter(format) {
    switch (format) {
        case 'json':
            return jsonFormat;
        case 'plain':
            return plainFormat;
        case 'stylish':
        default:
            return stylishFormat;
    }
}