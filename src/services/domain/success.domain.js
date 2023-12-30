class Success {
    constructor() {
        this.code = 200;
        this.message = 'Success';
    }

    getResponse() {
        const properties = { status: this.code, body: {} };
        if (this.token) properties['token'] = this.token;
        for (let key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== 'function' && key !== 'code' && key !== 'token') {
                properties.body[key] = this[key];
            }
        }
        return properties;
    }
}

module.exports = Success;
