# mark-validator

This libary is a validator manager. it helps us to validate json easy. like the code below.
There have two advantage. First, you can validate nest object. Second, you can custom the validate function which 
come from plugin or yourself.
```
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

```

## How to use ? 

### Step1. npm install

```
npm install mark-lin-validator
```

### Step2. Creating the validate and Executing initValidate method.

You can choose the custom function or the plugin function.

#### custom validate function

> There have a import point. the first parameter of custom function should be "value".

```
const validator = require('../src/validator');

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

```
#### Plugin validate function

You can choose plugin which you want to use. In the example, we use the [chriso/validator plugin](https://github.com/chriso/validator.js) 。

```
const {
    isEmail,
} = require('validator');
const validator = require('../src/validator');


validator.initValidate([
    isEmail,
]);
```

### Step3. Use ! .

```
require('./custom-validate');
const validator = require('../src/validator');

const {
    requireValue,
    isBoolean,
    requireNumberInRange,
} = validator.exportFunc();

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
```

### Step4. Result.

Result Object

```

{
    isSuccess : true/false,
    errors: [
        {
            msg: 'Invalid value for *people.age*, requireNumberInRange',
            checkerName: 'requireNumberInRange',
            checkTarget: 'people.age'
        }
    ]

}

```
