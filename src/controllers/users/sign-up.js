const express = require('express');
const {body} = require('express-validator');

const passwordManager = require('../../services/password-manager');
const validator = require('../../middlewares/validation');

const User = require('../../models/user');

const signUpAction = async (request, response, next) => {
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

const router = express.Router();
router.put(
    '/sign-up',
    [
        body('email')
            .isEmail()
            .withMessage('Email is not valid.')
            .custom((value) => {
                return User.findOne({email: value})
                    .then(user => {
                        if (user) {
                            return Promise.reject('User with this email address already exists.');
                        }
                    });
            }),
        body('name').notEmpty(),
        body('password').isLength({min: 5}),
    ],
    validator.expressValidation,
    signUpAction
);

module.exports = router;