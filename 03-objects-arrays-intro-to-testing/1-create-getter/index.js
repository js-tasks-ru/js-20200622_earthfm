/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */


export function createGetter(path) {
    let objects = [];
    const props = path.split('.');
    const lastProp = (props.length === 1) ? path : props[props.length - 1];

    return function(data) { 
        if (!Object.keys(data).length) {
            return undefined;
        }

        if (props.length !== 1) {
            deep(data); 
            const needObj = objects[objects.length - 1];
            return getResult(needObj, lastProp);
        } else {
            return getResult(data, lastProp);
        }
    }

    function deep(obj) {
        for (var value of Object.values(obj)) {
            if (typeof value === 'object') {
                objects = [...objects, value];
                deep(value);
            } else {
                return;
            }
        }
    }

    function getResult(obj, lastProp) {
        return obj.hasOwnProperty(lastProp) ? obj[lastProp] : undefined;
    }
}


