const express = require('express');
const bodyParser = require('body-parser');
const reviews = express.Router();

reviews.use(bodyParser.json());
reviews.use(bodyParser.urlencoded({ extended: true }));

/*** DATABASE ***/
var reviews_db = [{}];


/*** FUNCTIONS ***/


/*** METHODS ***/
/**
* GET /reviews
* ...
*/
reviews.get('/', async (req, res) => {
  //TODO
  // res.status(200);
  // return res.json(reviews_db);
});

/**
* POST /reviews
* ...
*/
reviews.post('/', async (req, res) => {
  //TODO
  // res.location('/'+reviews.id);
  // res.status(201);
  // return res.send();
});


module.exports = {
	reviews: reviews
};
