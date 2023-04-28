import supertest from 'supertest';
import {expect} from 'chai';

import * as appServer from '../../../app-server.js';
import * as authorizeUserHelper from '../../helpers/authorized-user.js';
import * as userRepository from '../../../src/repositories/user.js';

const app = appServer.init();

describe('DELETE /api/v1/users/:userId', () => {
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

    it('should delete user by userId', async () => {
        const header = await authorizeUserHelper.getAuthorizeHeader(app);

        const response = await supertest(app)
            .delete('/api/v1/users/' + userId)
            .set('Authorization', header);

        expect(response.statusCode).to.be.equal(200);
        expect(response.body.status).to.be.equal('Success');
    });

    after(async () => {
        await userRepository.deleteMany({roles: {$ne: 'ADMIN'}});
    });
});