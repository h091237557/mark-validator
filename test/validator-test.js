
const chai = require('chai');

const assert = chai.assert;

require('./validate');
const validator = require('../src/validator');

const {
    requireValue,
    isBoolean,
    requireNumberInRange,
} = validator.exportFunc();

describe('UNIT:validator.js -- Test validator', () => {
    it('Test simple object and one field value is empty', () => {
        const testObj = {
            name: undefined,
            isLiked: true,
        };

        validator.config = {
            name: [requireValue()],
            isLiked: [isBoolean()],
        };

        const result = validator.validate(testObj);
        assert.isFalse(result.isSuccess);
        assert.lengthOf(result.errors, 1, 'the name should not be empty');
    });

    it('should be true, if the filed of age is correctly formate', () => {
        const testObj = {
            age: '5',
        };

        validator.config = {
            age: [
                requireValue(),
            ],
        };

        const result = validator.validate(testObj);
        assert.isTrue(result.isSuccess);
        assert.lengthOf(result.errors, 0);
    });


    it('should be false, if the filed of age is incorrectly formate', () => {
        const testObj = {
            age: 35,
        };

        validator.config = {
            age: [
                requireValue(),
                requireNumberInRange(10, 25),
            ],
        };

        const result = validator.validate(testObj);
        assert.isFalse(result.isSuccess);
        assert.lengthOf(result.errors, 1, 'the age should not more than 25');
    });

    it('should be false, if the nest filed of count is incorrectly formate', () => {
        const testObj = {
            people: {
                name: 'Mark',
                age: 35,
            },
            count: 50,
        };

        validator.config = {
            people: {
                name: [requireValue()],
                age: [
                    requireValue(),
                    requireNumberInRange(10, 25),
                ],
            },
            count: [
                requireNumberInRange(0, 25),
            ],
        };

        const result = validator.validate(testObj);
        assert.isFalse(result.isSuccess);
        assert.lengthOf(result.errors, 2);
    });
});
