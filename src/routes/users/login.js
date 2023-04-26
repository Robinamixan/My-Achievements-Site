const express = require('express');
const {body} = require('express-validator');

const validator = require('../../middlewares/validation');
const loginAction = require('../../controllers/users/login');

const router = express.Router();

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