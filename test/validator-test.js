    debugger;
var chai = require('chai');
var expect = chai.expect;

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
            age: 25,
        };

        validator.config = {
            name: [requireValue()],
            age: [requireValue()],
        }

        var result = validator.validate(testObj);
        expect(result).to.equal(false);
    });

    it('should be false, if the filed of age is incorrectly formate', () => {

        var testObj = {
            age: "25",
        };

        validator.config = {
            age: [
                requireValue(),
                isBoolean()
            ],
        }

        var result = validator.validate(testObj);
        expect(result).to.equal(false);
    });


    it('should be false, if the filed of age is incorrectly formate', () => {

        var testObj = {
            age: 35,
        };

        validator.config = {
            age: [
                requireValue(),
                isBoolean(),
                requireNumberInRange(10,25)
            ],
        }

        var result = validator.validate(testObj);
        console.log(validator.getErrors())
        expect(result).to.equal(false);
    });
    
});
