var validator = {
    _types: {},
    _validateFunc: {},
    messages: [],
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
        var i, msg, type, result_ok;
        let checkers = null;
        this._validate(data,this.config);
        const temp_messages = Array.from(this.messages);
        this.messages.length = 0;
        return {
            isSuccess: temp_messages.length === 0,
            errors: temp_messages,
        }
        
    },
    _validate: function(data,config){

        if (typeof (data) === 'object') {
            for (i in data) {
                if (typeof data[i] === 'object') {
                    this._validate(data[i],config[i]);
                }
                if (data.hasOwnProperty(i)) {
                    checkers = config[i];

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

    }
}

module.exports = validator;
