export class HttpError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpError.prototype); // 👈 Ensures proper prototype chaining
    }

    toJSON() {
        return {
            error: this.message,
            statusCode: this.statusCode,
        };
    }
}
