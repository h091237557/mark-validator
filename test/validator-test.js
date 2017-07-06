debugger;
var chai = require('chai');
const assert = chai.assert;

require('./validate');
var validator = require('../src/validator');
const {
    requireValue,
    isBoolean,
    requireNumberInRange,
} = validator.exportFunc();

describe('UNIT:validator.js -- Test validator', () => {

    it('Test simple object and one field value is empty', () => {

        var testObj = {
            name: undefined,
            isLiked: true,
        };

        validator.config = {
            name: [requireValue()],
            isLiked: [isBoolean()],
        }

        var result = validator.validate(testObj);
        assert.isFalse(result.isSuccess);
        assert.lengthOf(result.errors, 1,'the name should not be empty');
    });

    it('should be true, if the filed of age is correctly formate', () => {

        var testObj = {
            age: "25",
        };

        validator.config = {
            age: [
                requireValue(),
            ],
        }

        var result = validator.validate(testObj);
        assert.isTrue(result.isSuccess);
        assert.lengthOf(result.errors, 0);
    });


    it('should be false, if the filed of age is incorrectly formate', () => {

        var testObj = {
            age: 35,
        };

        validator.config = {
            age: [
                requireValue(),
                requireNumberInRange(10, 25)
            ],
        }

        var result = validator.validate(testObj);
        assert.isFalse(result.isSuccess);
        assert.lengthOf(result.errors, 1,'the age should not more than 25');
    });

    it('should be false, if the nest filed of count is incorrectly formate', () => {

        var testObj = {
            people: {
                name: "Mark",
                age: 15,
            },
            count: 50
        };

        validator.config = {
            people: {
                name: [requireValue()],
                age: [
                    requireValue(),
                    requireNumberInRange(10, 25),
                ]
            },
            count: [
                requireNumberInRange(0, 25)
            ],
        }

        var result = validator.validate(testObj);
        assert.isFalse(result.isSuccess);
        assert.lengthOf(result.errors, 1,'the count should not more than 25');
    });

});
