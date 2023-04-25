const supertest = require('supertest');
const {expect} = require('chai');

const appServer = require('../../../app-server');
const authorizeUserHelper = require('../../helpers/authorized-user');

const app = appServer.init();

describe('GET /api/v1/users', () => {
    it('should return list of users', async () => {
        const header = await authorizeUserHelper.getAuthorizeHeader(app);

        const response = await supertest(app)
            .get('/api/v1/users')
            .set('Authorization', header);

        expect(response.statusCode).to.be.equal(200);
        expect(response.body.totalCount).to.be.equal(1);
    });
});