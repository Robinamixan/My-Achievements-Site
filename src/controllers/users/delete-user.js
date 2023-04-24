const express = require("express");
const {param} = require("express-validator");
const validator = require("../../middlewares/validation");

const authorizationHandler = require("../../middlewares/authorization");
const adminAccessHandler = require("../../middlewares/admin-access");

const User = require('../../models/user');
const AppError = require('../../errors/app-error');

const deleteUserAction = async (request, response, next) => {
    try {
        const userId = request.params.userId;

        const user = await User.findById(userId);
        assertUserExist(user);

        await User.findByIdAndDelete(userId);

        response.status(200).json({
            status: 'Success'
        });
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
