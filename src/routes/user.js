const express = require('express');
const {body, query, param} = require('express-validator');

const loginAction = require('../controllers/users/login');
const signUpAction = require('../controllers/users/sign-up');
const getUsersAction = require('../controllers/users/get-users');
const getUserDetailsAction = require('../controllers/users/get-user-details');
const updateUserAction = require('../controllers/users/update-user');
const deleteUserAction = require('../controllers/users/delete-user');

const validator = require('../middleware/validation');
const authorizationHandler = require('../middleware/authorization');
const adminAccessHandler = require('../middleware/admin-access');
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

router.get('/users',
    authorizationHandler,
    adminAccessHandler,
    [
        query('page').optional().isNumeric(),
        query('limit').optional().isNumeric(),
    ],
    validator.expressValidation,
    getUsersAction
);

router.get(
    '/users/:userId',
    authorizationHandler,
    [
        param('userId').isLength({min: 24, max: 24}),
    ],
    validator.expressValidation,
    getUserDetailsAction
);

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

router.delete(
    '/users/:userId',
    authorizationHandler,
    adminAccessHandler,
    [
        param('userId').isLength({min: 24, max: 24}),
    ],
    validator.expressValidation,
    deleteUserAction
);

module.exports = router;