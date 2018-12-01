const express = require('express');
const bodyParser = require('body-parser');
const submissions = express.Router();

submissions.use(bodyParser.json());
submissions.use(bodyParser.urlencoded({ extended: true }));

/*** DATABASE ***/
var submissions_db = [{}];


/*** FUNCTIONS ***/


/*** METHODS ***/
/**
* GET /submissions
* ...
*/
submissions.get('/', async (req, res) => {
  //TODO
  // res.status(200);
  // return res.json(submissions_db);
});

/**
* POST /submissions
* ...
*/
submissions.post('/', async (req, res) => {
  //TODO
  // res.location('/'+submissions.id);
  // res.status(201);
  // return res.send();
});


module.exports = {
	submissions: submissions
};
