const express = require('express');
const {param} = require('express-validator');

const authorizationHandler = require('../../middlewares/authorization');
const validator = require('../../middlewares/validation');
const getUserDetailsAction = require('../../controllers/users/get-user-details');

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

module.exports = router;