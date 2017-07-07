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
                validate: value => type.apply({
                    value,
                }, theArgs),
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
        let result = null;
        let checkers;

        if (typeof (data) === 'object') {
            const keys = Object.keys(data);
            keys.forEach((key) => {
                const field = (parent) ? `${parent}.${key}` : `${key}`;
                if (typeof data[key] === 'object') {
                    this._validate(data[key], config[key], field);
                    return;
                }
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    checkers = config[key];

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
            });
        }
    },
};

module.exports = validator;
