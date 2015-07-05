var keys = require("keys"),
    indexOf = require("index_of"),
    isPrimitive = require("is_primitive"),
    isFunction = require("is_function"),
    isArrayLike = require("is_array_like");


module.exports = deepCopy;


function deepCopy(object) {
    return baseDeepCopy(object, [], []);
}

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

    if (isPrimitive(object) || isFunction(object)) {
        return object;
    } else {
        if ((index = indexOf(seen, object)) !== -1) {
            return copied[index];
        } else {
            seen[seen.length] = object;

            if (isArrayLike(object)) {
                return copyArray(object, seen, copied);
            } else {
                return copyObject(object, object.constructor ? createConstructor(object) : {}, seen, copied);
            }
        }
    }
}

function createConstructor(object) {
    try {
        return new object.constructor();
    } catch (e) {
        return {};
    }
}
