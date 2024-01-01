require('dotenv').config();
const app = require('../src/app');
const request = require("supertest");

const testUser = {
    username: 'testUser',
    password: 'testPassword'
};

describe('POST /user-authentication/create-user', () => {
    it('OK, creating a new user works', async () => {
        const res = await request(app).post('/user-authentication/create-user').send(testUser);
        expect(res.statusCode).toBe(201);
    })
});

describe('POST /user-authentication/login-user', () => {
    it('OK, logging in a user works', async () => {
        const res = await request(app).post('/user-authentication/login-user').send(testUser);
        expect(res.statusCode).toBe(200);
    })
});