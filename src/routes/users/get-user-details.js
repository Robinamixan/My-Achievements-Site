const express = require('express');
const {param} = require('express-validator');

const authorizationHandler = require('../../middlewares/authorization');
const validator = require('../../middlewares/validation');
const getUserDetailsAction = require('../../controllers/users/get-user-details');

const router = express.Router();
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