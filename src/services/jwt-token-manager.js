const jwt = require('jsonwebtoken');
const { env } = require('node:process');

/**
 * @returns {string}
 */
module.exports.createToken = (data) => {
    return jwt.sign(
        data,
        env.JWT_SECRET_KEY,
        {expiresIn: '1d'}
    );
};

module.exports.verify = (token) => {
    jwt.verify(token, env.JWT_SECRET_KEY);
};

/**
 * @returns {?string}
 */
module.exports.decode = (token) => {
    return jwt.decode(token, env.JWT_SECRET_KEY);
};