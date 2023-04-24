const AppError = require('../errors/app-error');
const jwtManager = require('../services/jwt-token-manager');

module.exports = (request, response, next) => {
  const authorizationHeader = request.get('Authorization');
  if (!authorizationHeader) {
    throwAuthorizationError();
  }

  let decodedToken;

  try {
    const token = authorizationHeader.split(' ')[1];
    jwtManager.verify(token);
    decodedToken = jwtManager.decode(token);
  } catch (error) {
    throw new AppError(error.message, 401);
  }

  if (!decodedToken) {
    throwAuthorizationError();
  }

  request.userId = decodedToken.userId;

  next();
};

const throwAuthorizationError = () => {
  throw new AppError('Authorization failed.', 401);
};