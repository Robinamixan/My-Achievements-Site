import AppError from '../errors/app-error.js';
import * as jwtManager from '../services/jwt-token-manager.js';

export default function (request, response, next) {
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

  if (!decodedToken.userId) {
    throwAuthorizationError();
  }

  request.userId = decodedToken.userId;

  next();
}

function throwAuthorizationError() {
  throw new AppError('Authorization failed.', 401);
}