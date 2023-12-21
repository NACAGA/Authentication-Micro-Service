class Success {
    constructor() {
        this.code = 200;
        this.message = 'Success';
    }

    getResponse() {
        const properties = {};
        for (let key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== 'function') {
                properties[key] = this[key];
            }
        }
        return properties;
    }
}

module.exports = Success;
