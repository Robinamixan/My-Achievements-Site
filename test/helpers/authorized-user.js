import supertest from 'supertest';
import {expect} from 'chai';

import * as userRepository from '../../src/repositories/user.js';

const USER_EMAIL = 'admin_test@admin.com';
const USER_PASSWORD = 'admin_test';

export async function getAuthorizeHeader(app) {
    const body = {
        email: USER_EMAIL,
        password: USER_PASSWORD
    };

    const response = await supertest(app)
    .post('/api/v1/login')
    .send(body);

    expect(response.statusCode).to.be.equal(200);
    expect(response.body).to.has.property('token');

    return 'Bearer ' + response.body.token;
}

export async function createAuthorizedUser(app) {
    const body = {
        email: USER_EMAIL,
        password: USER_PASSWORD,
        name: 'admin'
    };

    const response = await supertest(app)
        .put('/api/v1/sign-up')
        .send(body);

    expect(response.statusCode).to.be.equal(200);
    expect(response.body).to.has.property('userId');

    const userId = response.body.userId;
    await setAdminRole(userId);

    return userId;
}

export async function removeAuthorizedUser() {
    await userRepository.deleteMany({email: USER_EMAIL});
}

async function setAdminRole(userId) {
    const user = await userRepository.findById(userId);

    userRepository.update(user, {
        roles: ['USER', 'ADMIN'],
    });
}