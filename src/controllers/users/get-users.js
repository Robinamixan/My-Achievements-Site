const User = require('../../models/user');

const ITEM_PER_PAGE = 10;

module.exports = async (request, response, next) => {
    try {
        const currentPage = request.query.page || 1;
        const itemsPerPage = request.query.limit || ITEM_PER_PAGE;

        const totalCount = await User.countDocuments();

        const users = await User.find()
            .skip((currentPage - 1) * itemsPerPage)
            .limit(itemsPerPage)
            .sort({updatedAt: -1});

        const items = users.map(user => {
            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                roles: user.roles,
                active: user.active,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
        });

        response.status(200).json({
            totalCount: totalCount,
            pages: Math.ceil(totalCount / itemsPerPage),
            items: items,
        });
    } catch (error) {
        next(error);
    }
};