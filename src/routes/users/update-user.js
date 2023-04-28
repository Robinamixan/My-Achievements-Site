import express from 'express';
import {param, body} from 'express-validator';

import authorizationHandler from '../../middlewares/authorization.js';
import adminAccessHandler from '../../middlewares/admin-access.js';
import * as userRepository from '../../repositories/user.js';
import * as validator from '../../middlewares/validation.js';
import updateUserAction from '../../controllers/users/update-user.js';

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

export default router;