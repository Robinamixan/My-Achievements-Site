const express = require('express');
const {param} = require('express-validator');

const authorizationHandler = require('../../middlewares/authorization');
const adminAccessHandler = require('../../middlewares/admin-access');
const validator = require('../../middlewares/validation');
const deleteUserAction = require('../../controllers/users/delete-user');

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

module.exports = router;