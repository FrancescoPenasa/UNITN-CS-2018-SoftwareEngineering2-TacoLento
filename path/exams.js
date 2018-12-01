const express = require('express');
const bodyParser = require('body-parser');
const exams = express.Router();

exams.use(bodyParser.json());
exams.use(bodyParser.urlencoded({ extended: true }));

/*** DATABASE ***/
var exams_db = [{}];


/*** FUNCTIONS ***/


/*** METHODS ***/
/**
* GET /exams
* ...
*/
exams.get('/', async (req, res) => {
  //TODO
  // res.status(200);
  // return res.json(exams_db);
});

/**
* POST /exams
* ...
*/
exams.post('/', async (req, res) => {
  //TODO
  // res.location('/'+exams.id);
  // res.status(201);
  // return res.send();
});


module.exports = {
	exams: exams
};
