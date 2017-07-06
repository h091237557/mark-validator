const validator = require('../src/validator');

function requireValue (){
    return (this.value) ? true:false;
}

function isBoolean() {
    return (typeof this.value === "boolean") ? true : false;
}

function requireNumberInRange(min,max){

    const field = this.value;
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
])
