const express = require('express');
const {body} = require('express-validator');

const loginAction = require('../controllers/users/login');
const signUpAction = require('../controllers/users/sign-up');
const signOutAction = require('../controllers/users/sign-out');
const restPasswordAction = require('../controllers/users/reset-password');
const validator = require('../middleware/validation');
const authorizationHandler = require('../middleware/authorization');
const User = require('../models/user');

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

router.post(
    '/login',
    [
        body('email').notEmpty(),
        body('password').notEmpty(),
    ],
    validator.expressValidation,
    loginAction
);

router.post('/sign-out', signOutAction);

router.post(
    '/reset-password',
    authorizationHandler,
    restPasswordAction
);

module.exports = router;