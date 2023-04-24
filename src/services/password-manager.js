const bcrypt = require('bcryptjs');

module.exports.hash = async (password) => {
    return await bcrypt.hash(password, 12);
};

module.exports.compare = async (originalPassword, hashedPassword) => {
    return await bcrypt.compare(originalPassword, hashedPassword);
};
