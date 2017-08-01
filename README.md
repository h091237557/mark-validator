# mark-validator




This libary is a validator manager. it helps us to validate json easy. like the code below.

There have two advantage.
*  First, you can validate nest object
*  Second, you can custom the validate function which come from plugin or yourself.

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

* [How to Use](https://github.com/h091237557/mark-validator#how-to-use-)
* [Nest Object Validate](https://github.com/h091237557/mark-validator#nest-object-validate)
* [Array Object Validate](https://github.com/h091237557/mark-validator#array-object-validate)


## How to use ? 

### Step1. npm install

```
npm install mark-lin-validator
```

### Step2. Creating the validates and Executing initValidate method.

You can choose  custom validate functions or  plugin functions.

#### custom validate function

> There have a import point. the first parameter of custom function should be "you want to validate value".

```
const validator = require('mark-lin-validator');

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
const validator = require('mark-lin-validator');


validator.initValidate([
    isEmail,
]);
```

### Step3. Use ! .

```
require('./custom-validate'); // It is your excuting initValidate method file.
const validator = require('mark-lin-validator');

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
## Nest Object Validate
If you want to validate the nest object, following the code below. 

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

```

## Array Object Validate
If you want to validate the object of array, following the code below. The field of data includes two objects. if you want to validate the array (!!!). you can follow to like the code below. the `requireValue` is the valiator's function of array. and the last of the object is not. it is the object of array validator.   

```
       const testObj = {
            author: 'Mark',
            data: [
                {
                    id: 1,
                    author: 'mark',
                },
                {
                    id: '2',
                    author: 'lin',
                },
            ],
            describe: 'Test',
        };

        validator.config = {
            author: [
                requireValue(),
            ],
            data: [
                requireValue(),   // validate the array.
                {  // validate the object of array.
                    id: [
                        requireValue(),
                        requireNumber(),
                    ],
                    author: [requireValue()],
                },
            ],
            describe: [
                requireValue(),
            ],
        };
```


