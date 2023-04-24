const {validationResult} = require('express-validator');

const AppError = require('../errors/app-error');

module.exports.expressValidation = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed. Please enter valid data.', 422, errors.array());
  }

  next();
};

module.exports.fileUploadValidation = (request, response, next) => {
  if (!request.file) {
    throw new AppError('No file provided.', 422);
  }

  next();
};