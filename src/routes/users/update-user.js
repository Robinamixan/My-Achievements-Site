const express = require('express');
const {param, body} = require('express-validator');

const authorizationHandler = require('../../middlewares/authorization');
const adminAccessHandler = require('../../middlewares/admin-access');
const userRepository = require('../../repositories/user');
const validator = require('../../middlewares/validation');
const updateUserAction = require('../../controllers/users/update-user');

const router = express.Router();
/**
 * @openapi
 * /users/{userId}:
 *   patch:
 *     tags:
 *       - User
 *     description: Update user data endpoint
 *     parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *     responses:
 *       200:
 *         description: Returns new userId for successful signup operation
 *       422:
 *         description: Returns error for not valid request data
 */
router.patch(
    '/users/:userId',
    authorizationHandler,
    adminAccessHandler,
    [
        param('userId').isLength({min: 24, max: 24}),
        body('email')
            .isEmail()
            .withMessage('Email is not valid.')
            .custom(async (value, {req}) => {
                const user = await userRepository.findOne({email: value});

                if (user && req.params.userId !== user._id.toString()) {
                    return Promise.reject('User with this email address already exists.');
                }
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