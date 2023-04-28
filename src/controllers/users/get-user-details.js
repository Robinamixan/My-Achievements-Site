import * as userRepository from '../../repositories/user.js';

import AppError from '../../errors/app-error.js';

export default async function(request, response, next) {
    try {
        const user = await userRepository.findById(request.params.userId);
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
}

function assertUserExist(user) {
    if (!user) {
        throw new AppError('User not found.', 404);
    }
}
