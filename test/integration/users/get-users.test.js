import supertest from 'supertest';
import {expect} from 'chai';

import * as appServer from '../../../app-server.js';
import * as authorizeUserHelper from '../../helpers/authorized-user.js';

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