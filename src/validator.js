var validator = {
    _types: {},
    _validateFunc: {},
    messages: [],
    config: {},
    initValidate: function(types, opt) {
        if (!Array.isArray(types)) {
            throw 'Init Error';
        }
        types.forEach((type) => {
            this._validateFunc[type.name] = (...theArgs) => {
                return (value) => {
                    return type.apply({
                        value: value
                    }, theArgs)
                };
            };
        });
    },
    exportFunc: function() {
        return this._validateFunc;
    },

    validate: function(data) {
        var i, msg, type, result_ok;
        let checkers = null;
        this.messages = [];

        if (typeof(data) === 'object') {
            for (i in data) {
                if (data.hasOwnProperty(i)) {
                    checkers = this.config[i];
                    checkers.forEach((checker) => {

                        result_ok = checker(data[i]);
                        if (!result_ok) {
                            msg = "Invalid value for *" + i + "*, " + checker.instructions;
                            this.messages.push(msg);
                        }

                    });
                }
            }
        }

        return this.noErrors();
    },
    noErrors: function() {
        return this.messages.length === 0;
    }
    getErros: function() {
        return this.messages;
    }
}

module.exports = validator;
