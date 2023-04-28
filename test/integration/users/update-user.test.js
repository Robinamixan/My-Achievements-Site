const supertest = require('supertest');
const {expect} = require('chai');

const appServer = require('../../../app-server');
const authorizeUserHelper = require('../../helpers/authorized-user');
const userRepository = require('../../../src/repositories/user');

const app = appServer.init();

describe('PATCH /api/v1/users/:userId', () => {
    let userId = null;
    before(async () => {
        const body = {
            email: 'test@test.com',
            password: 'test_pass',
            name: 'test'
        };

        const response = await supertest(app)
            .put('/api/v1/sign-up')
            .send(body);

        expect(response.statusCode).to.be.equal(200);

        userId = response.body.userId;
    });

    it('should return user details by userId', async () => {
        const header = await authorizeUserHelper.getAuthorizeHeader(app);

        const body = {
            email: 'test_new@test.com',
            name: 'test_name_updated',
            roles: ['USER', 'TEST_ROLE'],
            active: false,
        };

        const response = await supertest(app)
            .patch('/api/v1/users/' + userId)
            .set('Authorization', header)
            .send(body);

        expect(response.statusCode).to.be.equal(200);
        expect(response.body.id).to.be.equal(userId);
        expect(response.body.email).to.be.equal('test_new@test.com');
        expect(response.body.name).to.be.equal('test_name_updated');
        expect(response.body.active).to.be.equal(false);
        expect(response.body.roles).to.all.members(['USER', 'TEST_ROLE']);
    });

    after(async () => {
        await userRepository.deleteMany({roles: {$ne: 'ADMIN'}});
    });
});