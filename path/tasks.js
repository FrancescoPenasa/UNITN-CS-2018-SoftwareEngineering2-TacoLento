const express = require('express');
const bodyParser = require('body-parser');
const tasks = express.Router();

tasks.use(bodyParser.json());
tasks.use(bodyParser.urlencoded({ extended: true }));

/*** DATABASE ***/
var tasks_db = [{}];


/*** FUNCTIONS ***/


/*** METHODS ***/
/**
* GET /tasks
* ...
*/
tasks.get('/', async (req, res) => {
  //TODO
  // res.status(200);
  // return res.json(tasks_db);
});

/**
* POST /tasks
* ...
*/
tasks.post('/', async (req, res) => {
  //TODO
  // res.location('/'+tasks.id);
  // res.status(201);
  // return res.send();
});


module.exports = {
	tasks: tasks
};
