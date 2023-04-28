const passwordManager = require('../../services/password-manager');
const userRepository = require('../../repositories/user');

module.exports = async (request, response, next) => {
    try {
        const hashedPassword = await passwordManager.hash(request.body.password);

        const user = await userRepository.create({
            email: request.body.email,
            password: hashedPassword,
            name: request.body.name,
        });

        response.status(200).json({
            userId: user._id.toString(),
        });
    } catch (error) {
        next(error);
    }
};
