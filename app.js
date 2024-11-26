const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const app = express();
app.use(cors())

const v1 = '/api/v1'

const usersRoute = require('./app/api/v1/users/routes/user.route')
const avatarsRoute = require('./app/api/v1/users/routes/user.avatar.route')

const notFoundMiddleware = require('./app/middleware/notfound')
const errrorHandlerMiddleware = require('./app/middleware/handle.errors')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get(v1, (req, res) => res.status(200).json({ status: 'success', message: 'Welcome post API', name: 'post', version: '0.0.1', docs_link: '', health_check: '100', is_open: true }));
app.use(v1, usersRoute)
app.use(v1, avatarsRoute)

app.use(notFoundMiddleware)
app.use(errrorHandlerMiddleware)

module.exports = app;
