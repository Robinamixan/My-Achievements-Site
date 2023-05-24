import express from 'express';
import {query} from 'express-validator';

import authorizationHandler from '../../middlewares/authorization.js';
import adminAccessHandler from '../../middlewares/admin-access.js';
import * as validator from '../../middlewares/validation.js';
import getUsersAction from '../../controllers/users/get-users.js';

const router = express.Router();
/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - User
 *     description: Get users endpoint
 *     responses:
 *       200:
 *         description: Returns list of users with pagination info
 *       422:
 *         description: Returns error for not valid parameters
 */
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

export default router;