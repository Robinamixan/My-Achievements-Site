class AppError extends Error {
    constructor (message, statusCode, relatedErrors = null) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);

        this.statusCode = statusCode;
        this.relatedErrors = relatedErrors;
    }
}

export default AppError;