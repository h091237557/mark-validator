var validator = {
    _validateFunc: {},
    errors: [],
    config: {},
    initValidate: function (types, opt) {
        if (!Array.isArray(types)) {
            throw 'Init Error';
        }
        types.forEach((type) => {
            this._validateFunc[type.name] = (...theArgs) => {
                return {
                    name: type.name,
                    validate: (value) => {
                        return type.apply({
                            value: value
                        }, theArgs)
                    }
                }
            };
        });
    },
    exportFunc: function () {
        return this._validateFunc;
    },

    validate: function (data) {
        let checkers = null;
        this._validate(data, this.config);
        const temp_errors = Array.from(this.errors);
        this.errors.length = 0;
        return {
            isSuccess: temp_errors.length === 0,
            errors: temp_errors,
        }

    },
    _validate: function (data, config, parent) {
        let result = null;
        let msg;
        if (typeof (data) === 'object') {
            for (i in data) {
                const field = (parent) ? `${parent}.${i}` : `${i}`;
                if (typeof data[i] === 'object') {
                    this._validate(data[i], config[i], field);
                }
                if (data.hasOwnProperty(i)) {
                    checkers = config[i];

                    checkers.forEach((checker) => {

                        result = checker.validate(data[i]);
                        if (!result) {

                            this.errors.push({
                                msg: `Invalid value for *${field}*, ${checker.name}`,
                                checkerName: `${checker.name}`,
                                checkTarget: `${field}`
                            });
                        }

                    });
                }
            }
        }

    }
}

module.exports = validator;
