const passwordManager = require('../../services/password-manager');

const User = require('../../models/user');

module.exports = async (request, response, next) => {
    try {
        const hashedPassword = await passwordManager.hash(request.body.password);

        const user = new User({
            email: request.body.email,
            password: hashedPassword,
            name: request.body.name,
        });

        await user.save();

        response.status(200).json({
            userId: user._id.toString(),
        });
    } catch (error) {
        next(error);
    }
};
