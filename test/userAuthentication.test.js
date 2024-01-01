require('dotenv').config();
const app = require('../src/app');
const request = require("supertest");

describe('User Authentication API', () => {
    const testUser = {
        username: 'testUsers',
        password: 'testPassword'
    };
    let authToken;
    let testUserId;
    describe('POST /user-authentication/create-user', () => {
        it('OK, creating a new user works', async () => {
            const res = await request(app).post('/user-authentication/create-user').send(testUser);
            expect(res.statusCode).toBe(201);
        })
    });

    describe('POST /user-authentication/login-user', () => {
        it('OK, logging in a user works', async () => {
            const res = await request(app).post('/user-authentication/login-user').send(testUser);
            authToken = res.headers.authorization; // save the auth token for later use
            testUserId = res.body.userid; // save the user id for later use
            expect(res.statusCode).toBe(200);
        })
    });

    describe('DELETE /user-authentication/delete-user', () => {
        it('OK, deleting a user works', async () => {
            const res = await request(app).delete('/user-authentication/delete-user')
                .set('Authorization', authToken)
                .send({ id: testUserId });
            expect(res.statusCode).toBe(200);
        })
    });
});