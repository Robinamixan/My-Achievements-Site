const express = require('express');
const {param, body} = require('express-validator');

const authorizationHandler = require('../../middlewares/authorization');
const adminAccessHandler = require('../../middlewares/admin-access');
const User = require('../../models/user');
const validator = require('../../middlewares/validation');
const updateUserAction = require('../../controllers/users/update-user');

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