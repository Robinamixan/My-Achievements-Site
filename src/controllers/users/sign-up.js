import * as passwordManager from '../../services/password-manager.js';
import * as userRepository from '../../repositories/user.js';

export default async function(request, response, next) {
    try {
        const hashedPassword = await passwordManager.hash(request.body.password);

        const user = await userRepository.create({
            email: request.body.email,
            password: hashedPassword,
            name: request.body.name,
        });

        response.status(200).json({
            userId: user._id.toString(),
        });
    } catch (error) {
        next(error);
    }
}
