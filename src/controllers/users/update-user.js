const passwordManager = require('../../services/password-manager');
const userRepository = require('../../repositories/user');

const AppError = require('../../errors/app-error');

module.exports = async (request, response, next) => {
    try {
        const userId = request.params.userId;

        const user = await userRepository.findById(userId);
        assertUserExist(user);

        const updateData = {
            name: request.body.name,
            email: request.body.email,
            roles: request.body.roles,
            active: request.body.active,
        };

        if (request.body.password) {
            updateData.password = await passwordManager.hash(request.body.password);
        }

        await userRepository.update(user, updateData);

        response.status(200).json({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            roles: user.roles,
            active: user.active,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (error) {
        next(error);
    }
};

const assertUserExist = (user) => {
    if (!user) {
        throw new AppError('User not found.', 404);
    }
};
