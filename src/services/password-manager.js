import bcrypt from 'bcryptjs';

export async function hash (password) {
    return await bcrypt.hash(password, 12);
}

export async function compare(originalPassword, hashedPassword) {
    return await bcrypt.compare(originalPassword, hashedPassword);
}
