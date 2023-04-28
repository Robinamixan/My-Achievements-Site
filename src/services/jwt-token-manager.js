import jwt from 'jsonwebtoken';
import { env } from 'node:process';

/**
 * @returns {string}
 */
export function createToken(data) {
    return jwt.sign(
        data,
        env.JWT_SECRET_KEY,
        {expiresIn: '1d'}
    );
}

export function verify(token) {
    jwt.verify(token, env.JWT_SECRET_KEY);
}

/**
 * @returns {?string}
 */
export function decode(token) {
    return jwt.decode(token, env.JWT_SECRET_KEY);
}