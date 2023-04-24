const express = require('express');

const loginRoute = require('./login');
const signUpRoute = require('./sign-up');
const getUsersRoute = require('./get-users');
const getUserDetailsRoute = require('./get-user-details');
const updateUserRoute = require('./update-user');
const deleteUserRoute = require('./delete-user');

const router = express.Router();

router.use('/', signUpRoute);
router.use('/', loginRoute);
router.use('/', getUsersRoute);
router.use('/', getUserDetailsRoute);
router.use('/', updateUserRoute);
router.use('/', deleteUserRoute);

module.exports = router;