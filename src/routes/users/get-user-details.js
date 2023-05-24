import express from 'express';
import {param} from 'express-validator';

import authorizationHandler from '../../middlewares/authorization.js';
import * as validator from '../../middlewares/validation.js';
import getUserDetailsAction from '../../controllers/users/get-user-details.js';

const router = express.Router();
/**
 * @openapi
 * /users/{userId}:
 *   get:
 *     tags:
 *       - User
 *     description: Get user details endpoint
 *     parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *     responses:
 *       200:
 *         description: Returns user data by user id
 *       404:
 *         description: Returns error if user was not found
 */
router.get(
    '/users/:userId',
    authorizationHandler,
    [
        param('userId').isLength({min: 24, max: 24}),
    ],
    validator.expressValidation,
    getUserDetailsAction
);

export default router;