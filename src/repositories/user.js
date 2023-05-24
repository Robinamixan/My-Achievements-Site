import User from '../models/user.js';
import {DESC} from '../enums/sort-order.js';

/**
 * @returns {?number}
 */
export async function getTotalCount() {
    return User.countDocuments();
}

/**
 * @returns {?User[]}
 */
export async function find(page, itemsPerPage, order) {
    let sort = Object.assign({}, ...Object.keys(order).map(field => ({
        [field]: order[field] === DESC ? -1 : 1
    })));

    return User.find()
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage)
        .sort(sort);
}

/**
 * @returns {?User}
 */
export async function findOne(criteria) {
    return User.findOne(criteria);
}

/**
 * @returns {?User}
 */
export async function findById(id) {
    return User.findById(id);
}

/**
 * @returns {?User}
 */
export async function create(entityData) {
    const user = new User({
        email: entityData.email,
        password: entityData.password,
        name: entityData.name,
    });

    return user.save();
}

/**
 * @returns {?User}
 */
export async function update(user, updateData) {
    for (const [field, value] of Object.entries(updateData)) {
        user[field] = value;
    }

    return user.save();
}

export async function deleteById(id) {
    await User.findByIdAndDelete(id);
}

export async function deleteMany(criteria) {
    await User.deleteMany(criteria);
}