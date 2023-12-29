class Success {
    constructor() {
        this.code = 200;
        this.message = 'Success';
    }

    getResponse() {
        const properties = { status: this.code, body: {} };
        for (let key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== 'function' && key !== 'code') {
                properties.body[key] = this[key];
            }
        }
        return properties;
    }
}

module.exports = Success;
