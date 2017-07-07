const validator = require('../index');

function requireValue(value) {
    return !!(value);
}

function isBoolean(value) {
    return (typeof value === 'boolean');
}

function requireNumberInRange(value, min, max) {
    const field = value;
    if (typeof field !== 'number') {
        return false;
    }
    if (isNaN(min) || field < min) {
        return false;
    }
    if (isNaN(max) || field > max) {
        return false;
    }
    return true;
}

validator.initValidate([
    requireValue,
    isBoolean,
    requireNumberInRange,
]);
