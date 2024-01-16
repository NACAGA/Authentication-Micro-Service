require('dotenv').config();
const app = require('../src/app');
const request = require("supertest");
const db = require('../src/services/db.service');
const dbConfig = require('../src/configs/db.config');

function createDBJestFn() {
    let val = jest.fn();
    val.mockDbReturn = (val) => mockExecute.mockReturnValueOnce([val]);
    return val;
}

let mockExecute, mockEnd, mockDbConnection;

describe('mock db connection', () => {
    const mockUser = {
        username: 'mockUser',
        password: 'mockPassword',
        authToken: '',
        id: null
    };

    // ! change to beforeEach if you don't want calls to accumulate
    beforeEach(async () => {
        // make a mock db execute function
        mockExecute = createDBJestFn();
        mockEnd = jest.fn(); // doesn't need to do anything

        mockDbConnection = {
            execute: mockExecute,
            end: mockEnd
        };

        await db.setConnection(mockDbConnection);
    });

    describe('POST /user-authentication/create-user', () => {
        it('OK, creating a new user works', async () => {
            mockExecute.mockDbReturn([]).mockDbReturn({ affectedRows: 1 });
            const res = await request(app).post('/user-authentication/create-user').send(mockUser);
            expect(res.statusCode).toBe(201);
            expect(mockExecute).toHaveBeenCalled();
            expect(mockExecute).toHaveBeenCalledWith("SELECT * FROM Users WHERE username = ? AND status IN (?, ?)", [mockUser.username, 'ACTIVE', 'BLOCKED']);
            expect(mockExecute).toHaveBeenCalledWith("INSERT INTO Users (username, password, status) VALUES (?, ?, ?)", [mockUser.username, mockUser.password, 'ACTIVE']);
        })
    });

    describe('POST /user-authentication/login-user', () => {
        it('OK, logging in a user works', async () => {
            mockExecute.mockDbReturn([{ id: 1, username: mockUser.username, password: mockUser.password, status: 'ACTIVE' }]);
            const res = await request(app).post('/user-authentication/login-user').send(mockUser);
            mockUser.authToken = res.headers.authorization; // save the auth token for later use
            mockUser.id = res.body.userid; // save the user id for later use
            expect(res.statusCode).toBe(200);
            expect(mockExecute).toHaveBeenCalled();
            expect(mockExecute).toHaveBeenCalledWith("SELECT * FROM Users WHERE username = ? AND password = ? AND status = ?", [mockUser.username, mockUser.password, 'ACTIVE']);
        })
    });

    describe('PATCH /user-authentication/change-username', () => {
        const newUsername = 'newUsername';
        it('OK, changing a username works', async () => {
            mockExecute.mockDbReturn([[]]).mockDbReturn([]).mockDbReturn({ affectedRows: 1 });
            const res = await request(app).patch('/user-authentication/change-username')
                .set('Authorization', mockUser.authToken)
                .send({ new_username: newUsername });
            //console.log(mockExecute.mock.calls);
            expect(res.statusCode).toBe(200);
            expect(mockExecute).toHaveBeenCalled();
            expect(mockExecute).toHaveBeenCalledWith("UPDATE Users SET username = ? WHERE id = ?", [newUsername, mockUser.id]);
            mockUser.username = newUsername;
        })
    });

    describe('PATCH /user-authentication/change-password', () => {
        const newPassword = 'newPassword';
        it('OK, changing a password works', async () => {
            mockExecute.mockDbReturn([[]]).mockDbReturn({ affectedRows: 1 });
            const res = await request(app).patch('/user-authentication/change-password')
                .set('Authorization', mockUser.authToken)
                .send({ new_password: newPassword });
            expect(res.statusCode).toBe(200);
            expect(mockExecute).toHaveBeenCalled();
            expect(mockExecute).toHaveBeenCalledWith("UPDATE Users SET password = ? WHERE id = ?", [newPassword, mockUser.id]);
            mockUser.password = newPassword;
        })
    });

    describe('POST /user-authentication/login-user', () => {
        it('OK, logging in a user with new credentials works', async () => {
            mockExecute.mockDbReturn([{ id: 1, username: mockUser.username, password: mockUser.password, status: 'ACTIVE' }]);
            const res = await request(app).post('/user-authentication/login-user').send(mockUser);
            expect(res.statusCode).toBe(200);
            expect(res.body.userid).toBe(mockUser.id);
            expect(mockExecute).toHaveBeenCalled();
            expect(mockExecute).toHaveBeenCalledWith("SELECT * FROM Users WHERE username = ? AND password = ? AND status = ?", [mockUser.username, mockUser.password, 'ACTIVE']);
            mockUser.authToken = res.headers.authorization;
        })
    });

    describe('POST /user-authentication/validate-user-session', () => {
        it('OK, validating a user session works', async () => {
            mockExecute.mockDbReturn([{ id: 1, username: mockUser.username, password: mockUser.password, status: 'ACTIVE' }]);
            const res = await request(app).post('/user-authentication/validate-user-session')
                .set('Authorization', mockUser.authToken);
            expect(res.statusCode).toBe(200);
            expect(mockExecute).toHaveBeenCalled();
            expect(mockExecute).toHaveBeenCalledWith("SELECT * FROM Users WHERE id = ?", [mockUser.id]);
        })
    });

    describe('GET /user-authentication/get-users', () => {
        it('OK, getting users works', async () => {
            mockExecute.mockDbReturn([{ id: 1, username: mockUser.username }]);
            const res = await request(app).get('/user-authentication/get-users')
                .set('Authorization', mockUser.authToken)
                .send({ fields: ['username', 'id'] });
            expect(res.statusCode).toBe(200);
            expect(mockExecute).toHaveBeenCalled();
            expect(mockExecute).toHaveBeenCalledWith("SELECT * FROM Users WHERE status IN (?, ?)", ['ACTIVE', 'BLOCKED']);
        })
    });

    describe('GET /user-authentication/get-user-info', () => {
        it('OK, getting user info works', async () => {
            mockExecute.mockDbReturn([{ id: 1, username: mockUser.username }]);
            const res = await request(app).get('/user-authentication/get-user-info')
                .set('Authorization', mockUser.authToken)
                .send({ id: mockUser.id });
            expect(res.statusCode).toBe(200);
            expect(mockExecute).toHaveBeenCalled();
            expect(mockExecute).toHaveBeenCalledWith("SELECT * FROM Users WHERE id = ? and status IN (?, ?)", [mockUser.id, 'ACTIVE', 'BLOCKED']);
        })
    });

    describe('POST /user-authentication/activate-user', () => {
        it('OK, activating a user works', async () => {
            mockExecute.mockDbReturn([[]]).mockDbReturn({ affectedRows: 1 });
            const res = await request(app).post('/user-authentication/activate-user')
                .set('Authorization', mockUser.authToken)
                .send({ id: mockUser.id });
            expect(res.statusCode).toBe(200);
            expect(mockExecute).toHaveBeenCalled();
            expect(mockExecute).toHaveBeenCalledWith("UPDATE Users SET status = ? WHERE id = ?", ['ACTIVE', mockUser.id]);
            expect(mockExecute).toHaveBeenCalledWith("SELECT * FROM Users WHERE id = ?", [mockUser.id]);
        })
    });

    describe('DELETE /user-authentication/delete-user', () => {
        it('OK, deleting a user works', async () => {
            mockExecute.mockDbReturn([[]]).mockDbReturn({ affectedRows: 1 });
            const res = await request(app).delete('/user-authentication/delete-user')
                .set('Authorization', mockUser.authToken)
                .send({ id: mockUser.id });
            expect(res.statusCode).toBe(200);
            expect(mockExecute).toHaveBeenCalled();
            expect(mockExecute).toHaveBeenCalledWith("SELECT * FROM Users WHERE id = ?", [mockUser.id]);
            expect(mockExecute).toHaveBeenCalledWith("DELETE FROM Users WHERE id = ?", [mockUser.id]);
        })
    });

});