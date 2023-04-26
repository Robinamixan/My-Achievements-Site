const express = require('express');

const loginRoute = require('./users/login');
const signUpRoute = require('./users/sign-up');
const getUsersRoute = require('./users/get-users');
const getUserDetailsRoute = require('./users/get-user-details');
const updateUserRoute = require('./users/update-user');
const deleteUserRoute = require('./users/delete-user');

const router = express.Router();

router.use('/', signUpRoute);
router.use('/', loginRoute);
router.use('/', getUsersRoute);
router.use('/', getUserDetailsRoute);
router.use('/', updateUserRoute);
router.use('/', deleteUserRoute);

module.exports = router;