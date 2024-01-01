require('dotenv').config();
const app = require('../src/app');
const request = require("supertest");

describe('POST /user-authentication/create-user', () => {
    it('OK, creating a new user works', async () => {
        const res = await request(app).post('/user-authentication/create-user').send({
            username: 'test',
            password: 'test'
        });
        console.log(res.body);
        expect(res.statusCode).toBe(200);
    })
});