import express from 'express';
import {param} from 'express-validator';

import authorizationHandler from '../../middlewares/authorization.js';
import adminAccessHandler from '../../middlewares/admin-access.js';
import * as validator from '../../middlewares/validation.js';
import deleteUserAction from '../../controllers/users/delete-user.js';

const router = express.Router();
/**
 * @openapi
 * /users/{userId}:
 *   delete:
 *     tags:
 *       - User
 *     description: Delete user endpoint
 *     parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *     responses:
 *       200:
 *         description: Returns successful status of operation
 *       404:
 *         description: Returns error if user was not found
 */
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

export default router;