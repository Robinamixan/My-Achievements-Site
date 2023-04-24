const bcrypt = require('bcryptjs');

const User = require('../../models/user');

module.exports = async (request, response, next) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 12);

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
        next(error)
    }
};