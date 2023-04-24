const express = require('express');
const {param, body} = require('express-validator');
const validator = require('../../middlewares/validation');

const authorizationHandler = require('../../middlewares/authorization');
const adminAccessHandler = require('../../middlewares/admin-access');
const passwordManager = require('../../services/password-manager');

const User = require('../../models/user');
const AppError = require('../../errors/app-error');

const updateUserAction = async (request, response, next) => {
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

const router = express.Router();
router.patch(
    '/users/:userId',
    authorizationHandler,
    adminAccessHandler,
    [
        param('userId').isLength({min: 24, max: 24}),
        body('email')
            .isEmail()
            .withMessage('Email is not valid.')
            .custom((value, {req}) => {
                return User.findOne({email: value})
                    .then(user => {
                        if (user && req.params.userId !== user._id.toString()) {
                            return Promise.reject('User with this email address already exists.');
                        }
                    });
            }),
        body('name').notEmpty(),
        body('password').optional().isLength({min: 5}),
        body('roles').isArray().isLength({min: 1}),
        body('active').isBoolean(),
    ],
    validator.expressValidation,
    updateUserAction
);

module.exports = router;
