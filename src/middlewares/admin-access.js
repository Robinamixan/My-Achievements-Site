import AppError from '../errors/app-error.js';
import * as userRepository from '../repositories/user.js';
import {ROLE_ADMIN} from '../enums/user-roles.js';

export default async function (request, response, next) {
  try {
    const userId = request.userId;
    if (!userId) {
      throwAuthorizationError();
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      throwAuthorizationError();
    }

    if (!user.roles.includes(ROLE_ADMIN)) {
      throwAuthorizationError();
    }
  } catch (error) {
    next(error);
  }

  next();
}

function throwAuthorizationError() {
  throw new AppError('Authorization failed.', 401);
}