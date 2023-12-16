class Success {
    constructor() {
        this.code = 200;
        this.message = 'Success';
    }

    getResponse() {
        return {
            code: this.code,
            message: this.message,
        };
    }
}
