import * as userRepository from '../../repositories/user.js';
import {DESC} from '../../enums/sort-order.js';

const ITEM_PER_PAGE = 10;

export default async function(request, response, next) {
    try {
        const currentPage = request.query.page || 1;
        const itemsPerPage = request.query.limit || ITEM_PER_PAGE;

        const totalCount = await userRepository.getTotalCount();
        const users = await userRepository.find(currentPage, itemsPerPage, {updatedAt: DESC});

        const items = users.map(user => ({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            roles: user.roles,
            active: user.active,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));

        response.status(200).json({
            totalCount: totalCount,
            pages: Math.ceil(totalCount / itemsPerPage),
            items: items,
        });
    } catch (error) {
        next(error);
    }
}

