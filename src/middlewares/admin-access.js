const AppError = require('../errors/app-error');
const userRepository = require('../repositories/user');
const {ROLE_ADMIN} = require('../enums/user-roles');

module.exports = async (request, response, next) => {
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
};

const throwAuthorizationError = () => {
  throw new AppError('Authorization failed.', 401);
};