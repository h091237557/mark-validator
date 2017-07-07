
const chai = require('chai');

const assert = chai.assert;

require('./plugin-validate');
const validator = require('../src/validator');

const {
    isEmail,
} = validator.exportFunc();

describe('Plugin validate test', () => {
    it('should be true, if the email of field is correctly formate', () => {
        const testObj = {
            email: 'h091237557@gmail.com',
        };

        validator.config = {
            email: [isEmail()],
        };

        const result = validator.validate(testObj);
        assert.isTrue(result.isSuccess);
    });

    it('should be false, if the secondEmail of field is incorrectly formate', () => {
        const testObj = {
            email: 'h091237557@gmail.com',
            secondEmail: 'aaaaa',
        };

        validator.config = {
            email: [isEmail()],
            secondEmail: [isEmail()],
        };

        const result = validator.validate(testObj);
        assert.isFalse(result.isSuccess);
        assert.lengthOf(result.errors, 1);
    });
});
