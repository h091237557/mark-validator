const {
    isEmail,
} = require('validator');
const validator = require('../index');


validator.initValidate([
    isEmail,
]);
