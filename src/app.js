require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userAuthenticationRouter = require('./routes/userAuthentication.route');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({ message: 'ok' });
});

app.use('/user-authentication', userAuthenticationRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

module.exports = app;