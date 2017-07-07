const {
    isEmail,
} = require('validator');
const validator = require('../src/validator');


validator.initValidate([
    isEmail,
]);
