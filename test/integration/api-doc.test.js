const supertest = require('supertest');
const {expect} = require('chai');

const appServer = require('../../app-server');

const app = appServer.init();

describe('GET /api/doc/', () => {
    it('should check status of app', async () => {
        const response = await supertest(app).get('/api/doc/');

        expect(response.statusCode).to.be.equal(200);
    });
});