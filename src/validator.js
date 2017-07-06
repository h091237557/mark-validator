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
    exportFunc: function() {
        return this._validateFunc;
    },

    validate: function(data) {
        var i, msg, type, result_ok;
        let checkers = null;
        this.messages = [];

        if (typeof(data) === 'object') {
            for (i in data) {
                if (typeof data[i] === 'object'){
                    this.validate(data[i]);
                }
                if (data.hasOwnProperty(i)) {
                    checkers = this.config[i];
                    checkers.forEach((checker) => {

                        result_ok = checker.validate(data[i]);
                        if (!result_ok) {
                            msg = "Invalid value for *" + i + "*, " + checker.name;
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
    },
    getErrors: function() {
        return this.messages;
    }
}

module.exports = validator;
