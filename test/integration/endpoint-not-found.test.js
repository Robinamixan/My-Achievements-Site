import supertest from 'supertest';
import {expect} from 'chai';

import * as appServer from '../../app-server.js';

const app = appServer.init();

describe('GET not exist endpoint', () => {
    it('should return 404 status with error message', async () => {
        const response = await supertest(app).get('/api/v1/test-endpoint');

        expect(response.statusCode).to.be.equal(404);
        expect(response.body.message).to.be.equal('Endpoint was not found.');
    });
});