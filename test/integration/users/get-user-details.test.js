const supertest = require('supertest');
const {expect} = require('chai');

const appServer = require('../../../app-server');
const authorizeUserHelper = require('../../helpers/authorized-user');
const User = require('../../../src/models/user');

const app = appServer.init();

describe('GET /api/v1/users/:userId', () => {
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

        const response = await supertest(app)
            .get('/api/v1/users/' + userId)
            .set('Authorization', header);

        expect(response.statusCode).to.be.equal(200);
        expect(response.body.id).to.be.equal(userId);
    });

    after(async () => {
        await User.deleteMany({roles: {$ne: 'ADMIN'}});
    });
});