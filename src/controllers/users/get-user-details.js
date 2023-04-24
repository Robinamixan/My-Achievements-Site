const express = require("express");
const {param} = require("express-validator");
const validator = require("../../middlewares/validation");

const authorizationHandler = require("../../middlewares/authorization");

const User = require('../../models/user');
const AppError = require('../../errors/app-error');

const getUserDetailsAction = async (request, response, next) => {
    try {
        const userId = request.params.userId;

        const user = await User.findById(userId);
        assertUserExist(user);

        const responseData = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            roles: user.roles,
            active: user.active,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        response.status(200).json(responseData);
    } catch (error) {
        next(error);
    }
};

const assertUserExist = (user) => {
    if (!user) {
        throw new AppError('User not found.', 404);
    }
};

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