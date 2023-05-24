import supertest from 'supertest';
import {expect} from 'chai';

import * as appServer from '../../app-server.js';

const app = appServer.init();

describe('GET /api/doc/', () => {
    it('should check status of app', async () => {
        const response = await supertest(app).get('/api/doc/');

        expect(response.statusCode).to.be.equal(200);
    });
});