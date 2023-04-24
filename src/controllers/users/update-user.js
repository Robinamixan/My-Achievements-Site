const passwordManager = require('../../services/password-manager');

const User = require('../../models/user');
const AppError = require('../../errors/app-error');

module.exports = async (request, response, next) => {
    try {
        const userId = request.params.userId;

        const user = await User.findById(userId);
        assertUserExist(user);

        user.name = request.body.name;
        user.email = request.body.email;
        user.roles = request.body.roles;
        user.active = request.body.active;

        if (request.body.password) {
            user.password = await passwordManager.hash(request.body.password);
        }

        await user.save();

        const responseData = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            roles: user.roles,
            active: user.active,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        response.status(200).json(responseData);
    } catch (error) {
        next(error);
    }
};

const assertUserExist = (user) => {
    if (!user) {
        throw new AppError('User not found.', 404);
    }
};