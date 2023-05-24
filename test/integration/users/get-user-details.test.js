import supertest from 'supertest';
import {expect} from 'chai';

import * as appServer from '../../../app-server.js';
import * as authorizeUserHelper from '../../helpers/authorized-user.js';
import * as userRepository from '../../../src/repositories/user.js';

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
        await userRepository.deleteMany({roles: {$ne: 'ADMIN'}});
    });
});