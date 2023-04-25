const supertest = require('supertest');
const {expect} = require('chai');

const User = require('../../src/models/user');

const USER_EMAIL = 'admin_test@admin.com';
const USER_PASSWORD = 'admin_test';

module.exports.getAuthorizeHeader = async (app) => {
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
};

module.exports.createAuthorizedUser = async (app) => {
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
};

module.exports.removeAuthorizedUser = async () => {
    await User.deleteOne({email: USER_EMAIL});
};

const setAdminRole = async (userId) => {
    const user = await User.findById(userId);

    user.roles = ['USER', 'ADMIN'];
    await user.save();
};