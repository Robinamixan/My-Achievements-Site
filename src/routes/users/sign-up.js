const express = require('express');
const {body} = require('express-validator');

const User = require('../../models/user');
const validator = require('../../middlewares/validation');
const signUpAction = require('../../controllers/users/sign-up');

const router = express.Router();
/**
 * @openapi
 * /sign-up:
 *   put:
 *     tags:
 *       - User
 *     description: Sign up endpoint
 *     responses:
 *       200:
 *         description: Returns new userId for successful signup operation
 *       422:
 *         description: Returns error for not valid request data
 */
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