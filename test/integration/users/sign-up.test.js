const supertest = require('supertest');
const {expect} = require('chai');

const userRepository = require('../../../src/repositories/user');
const appServer = require('../../../app-server');
const app = appServer.init();

describe('PUT /api/v1/sign-up', () => {
    it('should create new user by data', async () => {
        const body = {
            email: 'test@test.com',
            password: 'test_pass',
            name: 'test'
        };

        const response = await supertest(app)
            .put('/api/v1/sign-up')
            .send(body);

        expect(response.statusCode).to.be.equal(200);
        expect(response.body).to.has.property('userId');
    });

    it('should throw validation error for not valid data', async () => {
        const body = {
            email: 'test_email',
            password: 'pwd'
        };

        const response = await supertest(app)
            .put('/api/v1/sign-up')
            .send(body);

        expect(response.statusCode).to.be.equal(422);
        expect(response.body).to.has.property('message', 'Validation failed. Please enter valid data.');
        expect(response.body).to.has.property('errors');
    });

    after(async () => {
        await userRepository.deleteMany({roles: {$ne: 'ADMIN'}});
    });
});