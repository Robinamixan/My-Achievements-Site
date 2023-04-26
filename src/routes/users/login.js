const express = require('express');
const {body} = require('express-validator');

const validator = require('../../middlewares/validation');
const loginAction = require('../../controllers/users/login');

const router = express.Router();
/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - User
 *     description: Authentication endpoint
 *     responses:
 *       200:
 *         description: Returns auth token for successful authentication
 *       403:
 *         description: Returns error if authentication was failed
 */
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Email is not valid.'),
        body('password').isLength({min: 5}),
    ],
    validator.expressValidation,
    loginAction
);

module.exports = router;