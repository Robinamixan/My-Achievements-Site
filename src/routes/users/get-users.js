const express = require('express');
const {query} = require('express-validator');

const authorizationHandler = require('../../middlewares/authorization');
const adminAccessHandler = require('../../middlewares/admin-access');
const validator = require('../../middlewares/validation');
const getUsersAction = require('../../controllers/users/get-users');

const router = express.Router();
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

module.exports = router;