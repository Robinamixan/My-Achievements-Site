import {validationResult} from 'express-validator';

import AppError from '../errors/app-error.js';

export function expressValidation(request, response, next) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new AppError(
            'Validation failed. Please enter valid data.',
            422,
            errors.array(),
        );
    }

    next();
}

export function fileUploadValidation(request, response, next) {
    if (!request.file) {
        throw new AppError('No file provided.', 422);
    }

    next();
}