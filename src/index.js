var keys = require("keys"),
    indexOf = require("index_of"),
    isObject = require("is_object"),
    isFunction = require("is_function"),
    isArrayLike = require("is_array_like");


function copyArray(array, seen, copied) {
    var length = array.length,
        i = -1,
        il = length - 1,
        out = new Array(length);

    copied[copied.length] = out;

    while (i++ < il) {
        out[i] = baseDeepCopy(array[i], seen, copied);
    }

    return out;
}

function copyObject(object, out, seen, copied) {
    var objectKeys = keys(object),
        i = -1,
        il = objectKeys.length - 1,
        key;

    copied[copied.length] = out;

    while (i++ < il) {
        key = objectKeys[i];
        out[key] = baseDeepCopy(object[key], seen, copied);
    }

    return out;
}

function baseDeepCopy(object, seen, copied) {
    var index;

    if (!isObject(object) || isFunction(object)) {
        return object;
    }
    if ((index = indexOf(seen, object)) !== -1) {
        return copied[index];
    }

    seen[seen.length] = object;

    if (isArrayLike(object)) {
        return copyArray(object, seen, copied);
    } else {
        return copyObject(object, {}, seen, copied);
    }
}

module.exports = function deepCopy(object) {
    return baseDeepCopy(object, [], []);
};
