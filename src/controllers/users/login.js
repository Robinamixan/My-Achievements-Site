import * as jwtManager from '../../services/jwt-token-manager.js';
import * as passwordManager from '../../services/password-manager.js';
import * as userRepository from '../../repositories/user.js';

import AppError from '../../errors/app-error.js';

export default async function(request, response, next) {
    try {
        const user = await userRepository.findOne({email: request.body.email});
        assetUserExist(user);
        await assertEqualPasswords(user, request.body.password);

        const token = jwtManager.createToken({
            email: user.email,
            userId: user._id.toString(),
        });

        response.status(200).json({
            token: token,
            userId: user._id.toString(),
        });
    } catch (error) {
        next(error);
    }
}

function assetUserExist(user) {
    if (!user) {
        throw new AppError('User was not found.', 403);
    }
}

async function assertEqualPasswords(user, requestPassword) {
    const isEqualPassword = await passwordManager.compare(requestPassword, user.password);
    if (!isEqualPassword) {
        throw new AppError('Authentication failed.', 403);
    }
}
