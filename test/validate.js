const validator = require('../src/validator');

function requireValue (){
    return (this.value) ? true:false;
}

function isBoolean() {
    return (typeof this.value === "boolean") ? true : false;
}

validator.initValidate([
    requireValue,
    isBoolean,
])
