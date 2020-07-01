/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    let obj = {};
    const letters = string.split('');
    let currentSize = (typeof size === 'undefined') ? string.length : size;

    for (const char of string) {
        if (!obj.hasOwnProperty(char)) {
            obj[char] = 0;
        }

        obj[char] += 1;
    }

    return letters.reduce((result, char) => {
        if (obj[char] <= currentSize) {
            return result += char;
        } else {
            obj[char] -= 1;
            return result;
        }
    }, '');
}