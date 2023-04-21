const bcrypt = require('bcryptjs');

const User = require('../../models/user');

module.exports = (request, response, next) => {
    const email = request.body.email;
    const password = request.body.password;
    const name = request.body.name;

    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                name: name,
            });

            return user.save();
        })
        .then(result => {
            response.status(200).json({
                userId: result._id.toString(),
            });
        })
        .catch(error => next(error));
};