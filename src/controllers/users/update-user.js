import * as passwordManager from '../../services/password-manager.js';
import * as userRepository from '../../repositories/user.js';

import AppError from '../../errors/app-error.js';

export default async function(request, response, next) {
    try {
        const userId = request.params.userId;

        const user = await userRepository.findById(userId);
        assertUserExist(user);

        const updateData = {
            name: request.body.name,
            email: request.body.email,
            roles: request.body.roles,
            active: request.body.active,
        };

        if (request.body.password) {
            updateData.password = await passwordManager.hash(
                request.body.password);
        }

        await userRepository.update(user, updateData);

        response.status(200).json({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            roles: user.roles,
            active: user.active,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (error) {
        next(error);
    }
}

function assertUserExist(user) {
    if (!user) {
        throw new AppError('User not found.', 404);
    }
}
