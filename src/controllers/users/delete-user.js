import * as userRepository from '../../repositories/user.js';

import AppError from '../../errors/app-error.js';

export default async function(request, response, next) {
    try {
        const userId = request.params.userId;

        const user = await userRepository.findById(userId);
        assertUserExist(user);

        await userRepository.deleteById(userId);

        response.status(200).json({
            status: 'Success'
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
