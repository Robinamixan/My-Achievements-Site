import supertest from 'supertest';
import {expect} from 'chai';

import * as appServer from '../../app-server.js';

const app = appServer.init();

describe('GET /api/v1/health-check', () => {
    it('should check status of app', async () => {
        const response = await supertest(app).get('/api/v1/health-check');

        expect(response.statusCode).to.be.equal(200);
        expect(response.body.status).to.be.equal('ok');
    });
});