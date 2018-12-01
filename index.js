const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())

/*** GET /users, POST /users, GET /users/:id, PUT /users/:id, DELETE /users/:id ***/
const users = require('./path/users').users;
app.use('/users', users);
/*** GET /reviews, ***/
const reviews = require('./path/reviews').reviews;
app.use('/reviews', reviews);
/***  ***/
const tasks = require('./path/tasks').tasks;
app.use('/tasks', tasks);
/***  ***/
const submissions = require('./path/submissions').submissions;
app.use('/submissions', submissions);
/***  ***/
const exams = require('./path/exams').exams;
app.use('/exams', exams);

app.get('/', (req, res) => res.status(200).send('Hello World!'));


module.exports = app;
