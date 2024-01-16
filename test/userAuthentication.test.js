require('dotenv').config();
const app = require('../src/app');
const request = require("supertest");
const db = require('../src/services/db.service');
const dbConfig = require('../src/configs/db.config');

describe('GET /', () => {
    it('OK, getting root works', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('ok');
    })
});

describe('router userAuthentication', () => {
    const testUser = {
        username: 'testUser',
        password: 'testPassword',
        authToken: '',
        id: null
    };

    beforeAll(async () => {
        await db.destroyConnection();
        await db.getConnection(true);
    });

    afterAll(async () => {
        // close the db connection so it doesn't block any other tests
        await db.closeConnection();
    });
    describe('POST /user-authentication/create-user', () => {
        it('OK, creating a new user works', async () => {
            const res = await request(app).post('/user-authentication/create-user').send(testUser);
            expect(res.statusCode).toBe(201);
        })
    });

    describe('POST /user-authentication/login-user', () => {
        it('OK, logging in a user works', async () => {
            const res = await request(app).post('/user-authentication/login-user').send(testUser);
            testUser.authToken = res.headers.authorization; // save the auth token for later use
            testUser.id = res.body.userid; // save the user id for later use
            expect(res.statusCode).toBe(200);
        })
    });

    describe('PATCH /user-authentication/change-username', () => {
        const newUsername = 'newUsername';
        it('OK, changing a username works', async () => {
            const res = await request(app).patch('/user-authentication/change-username')
                .set('Authorization', testUser.authToken)
                .send({ new_username: newUsername });
            expect(res.statusCode).toBe(200);
            testUser.username = newUsername;
        })
    });

    describe('PATCH /user-authentication/change-password', () => {
        const newPassword = 'newPassword';
        it('OK, changing a password works', async () => {
            const res = await request(app).patch('/user-authentication/change-password')
                .set('Authorization', testUser.authToken)
                .send({ new_password: newPassword });
            expect(res.statusCode).toBe(200);
            testUser.password = newPassword;
        })
    });


    describe('POST /user-authentication/login-user', () => {
        it('OK, logging in a user with new credentials works', async () => {
            const res = await request(app).post('/user-authentication/login-user').send(testUser);
            expect(res.statusCode).toBe(200);
            expect(res.body.userid).toBe(testUser.id);
            testUser.authToken = res.headers.authorization;
        })
    });


    describe('POST /user-authentication/validate-user-session', () => {
        it('OK, validating a user session works', async () => {
            const res = await request(app).post('/user-authentication/validate-user-session')
                .set('Authorization', testUser.authToken);
            expect(res.statusCode).toBe(200);
        })
    });

    describe('GET /user-authentication/get-users', () => {
        it('OK, getting users works', async () => {
            const res = await request(app).get('/user-authentication/get-users')
                .set('Authorization', testUser.authToken)
                .send({ fields: ['username', 'id'] });
            expect(res.statusCode).toBe(200);
        })
    });

    describe('GET /user-authentication/get-user-info', () => {
        it('OK, getting user info works', async () => {
            const res = await request(app).get('/user-authentication/get-user-info')
                .set('Authorization', testUser.authToken)
                .send({ id: testUser.id });
            expect(res.statusCode).toBe(200);
        })
    });

    describe('POST /user-authentication/activate-user', () => {
        it('OK, activating a user works', async () => {
            const res = await request(app).post('/user-authentication/activate-user')
                .set('Authorization', testUser.authToken)
                .send({ id: testUser.id });
            expect(res.statusCode).toBe(200);
        })
    });

    describe('DELETE /user-authentication/delete-user', () => {
        it('OK, deleting a user works', async () => {
            const res = await request(app).delete('/user-authentication/delete-user')
                .set('Authorization', testUser.authToken)
                .send({ id: testUser.id });
            expect(res.statusCode).toBe(200);
        })
    });
});
//* /