const validator = {
    _validateFunc: {},
    errors: [],
    config: {},
    initValidate(types) {
        if (!Array.isArray(types)) {
            throw new Error('Init Error');
        }
        types.forEach((type) => {
            this._validateFunc[type.name] = (...theArgs) => ({
                name: type.name,
                validate: (value) => {
                    theArgs.unshift(value);
                    return type.apply({}, theArgs);
                },
            });
        });
    },
    exportFunc() {
        return this._validateFunc;
    },

    validate(data) {
        this._validate(data, this.config);
        const tempErrors = Array.from(this.errors);
        this.errors.length = 0;
        return {
            isSuccess: tempErrors.length === 0,
            errors: tempErrors,
        };
    },
    _validate(data, config, parent) {
        if (typeof (data) === 'object') {
            const keys = Object.keys(data);
            keys.forEach((key) => {
                const field = (parent) ? `${parent}.${key}` : `${key}`;
                if (typeof data[key] === 'object') {
                    if (Array.isArray(data[key])) {
                        this._validateArray(data, config, key, field);
                        return;
                    }

                    this._validate(data[key], config[key], field);
                } else {
                    this._validateAll(data, config, key, field);
                }
            });
        }
    },
    _validateAll(data, config, key, field) {
        let result;
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const checkers = config[key];

            checkers.forEach((checker) => { // eslint-disable-line no-loop-func
                result = checker.validate(data[key]);
                if (!result) {
                    this.errors.push({
                        msg: `Invalid value for *${field}*, ${checker.name}`,
                        checkerName: `${checker.name}`,
                        checkTarget: `${field}`,
                    });
                }
            });
        }
    },
    _validateArray(data, config, key, field) {
        let result;
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const checkers = config[key];

            for (let i = 0; i < checkers.length; i += 1) {
                if (i === checkers.length - 1) {
                    const arrayCheckers = checkers[i];
                    const arrayKeys = Object.keys(data[key][0]);
                    let temp = 0;
                    data[key].forEach((obj) => { // eslint-disable-line no-loop-func
                        arrayKeys.forEach((arrayKey) => {
                            arrayCheckers[arrayKey].forEach((arrayChecker) => {
                                result = arrayChecker.validate(obj[arrayKey]);
                                if (!result) {
                                    this.errors.push({
                                        msg: `Invalid value for *${field}.${temp}.${arrayKey}*, ${arrayChecker.name}`,
                                        checkerName: `${arrayChecker.name}`,
                                        checkTarget: `${field}.${temp}.${arrayKey}`,
                                    });
                                }
                            });
                        });
                        temp += 1;
                    });
                    return;
                }

                result = checkers[i].validate(data[key]);
                if (!result) {
                    this.errors.push({
                        msg: `Invalid value for *${field}*, ${checkers[i].name}`,
                        checkerName: `${checkers[i].name}`,
                        checkTarget: `${field}`,
                    });
                }
            }

            checkers.forEach((checker) => { // eslint-disable-line no-loop-func
                result = checker.validate(data[key]);
                if (!result) {
                    this.errors.push({
                        msg: `Invalid value for *${field}*, ${checker.name}`,
                        checkerName: `${checker.name}`,
                        checkTarget: `${field}`,
                    });
                }
            });
        }
    },
};

module.exports = validator;
