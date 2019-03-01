const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())

/*** GET /users, POST /users, GET /users/:id, PUT /users/:id, DELETE /users/:id ***/
const users = require('./src/users').users;
app.use('/users', users);
/*** GET /reviews, ***/
const reviews = require('./src/reviews').reviews;
app.use('/reviews', reviews);
/***  ***/
const tasks = require('./src/tasks').tasks;
app.use('/tasks', tasks);
/***  ***/
const submissions = require('./src/submissions').submissions;
app.use('/submissions', submissions);
/***  ***/
const exams = require('./src/exams').exams;
app.use('/exams', exams);

app.get('/', (req, res) => res.status(200).send(''+
    '<h1>Welcome to TacoLento_project!</h1><br>'+
    '<h3>TacoLento is a project for the SE2 course</h3><br>'+
    'The aim of the project is to create an API that allows it\'s users to create \"exams\" and tasks. Every exam has an expiration date and a group of people that need to do the exam. An exam consists of a group of questions (multiple choice, open questions, etc...) that can be defined by the user that created the exam or his collaborators.<br>'+
    'This is the link for the API: https://tacolento-project.herokuapp.com/ <br>'+
    'This is the link for the development API: https://tacolento-develop.herokuapp.com/ <br>'+
    'This is the link for the apiary: https://tacolentoproject.docs.apiary.io/ <br> '
));

module.exports = app;
