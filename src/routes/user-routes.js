import express from 'express';

import loginRoute from './users/login.js';
import signUpRoute from './users/sign-up.js';
import getUsersRoute from './users/get-users.js';
import getUserDetailsRoute from './users/get-user-details.js';
import updateUserRoute from './users/update-user.js';
import deleteUserRoute from './users/delete-user.js';

const router = express.Router();

router.use('/', signUpRoute);
router.use('/', loginRoute);
router.use('/', getUsersRoute);
router.use('/', getUserDetailsRoute);
router.use('/', updateUserRoute);
router.use('/', deleteUserRoute);

export default router;