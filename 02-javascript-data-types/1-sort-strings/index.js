/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    const words = [...arr];
    
    return words.sort((a, b) => 
        param === 'asc' ? compareString(a, b) : compareString(b, a)
    );
}

const compareString = (str1, str2) => {
    return str1.localeCompare(str2, [], {caseFirst: 'upper'});
}