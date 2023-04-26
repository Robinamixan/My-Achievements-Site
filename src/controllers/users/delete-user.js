const User = require('../../models/user');
const AppError = require('../../errors/app-error');

module.exports = async (request, response, next) => {
    try {
        const userId = request.params.userId;

        const user = await User.findById(userId);
        assertUserExist(user);

        await User.findByIdAndDelete(userId);

        response.status(200).json({
            status: 'Success'
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
