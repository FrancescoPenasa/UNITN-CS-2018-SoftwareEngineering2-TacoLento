const express = require('express');
const bodyParser = require('body-parser');
const reviews = express.Router();

reviews.use(bodyParser.json());
reviews.use(bodyParser.urlencoded({ extended: true }));

/*** DATABASE ***/
/**
* reviews_db is a collection of review objects.
* review = {
*  id : Integer,
*  userId : Integer,
*  submissionId : Integer,
*  result : Boolean,
*  comments : [
*	 	 idTask : Integer,
*		 comments : String
*  ]
* }
*/
var reviews_db = [{
	id : 0,
	userId : 0,
	submissionId : 0,
	result : true,
	comments : [{
		idTask : 0,
		comments : "test"
	}]
}];

/*** FUNCTIONS ***/
/**
* Create review
* create an object review using the parameters from the body of the request.
*/
function create_review(req){
  return review = {
		id : reviews_db.length,
		userId : req.body.userId,
		submissionId : req.body.submissionId,
		result : req.body.result,
		comments : [{
			idTask : req.body.comments.idTask,
			comments : req.body.comments.comments
		}]
	};
}

/**
* Input not valid if
* - name or surname or email is not a String
* - name or surname or email is null or empty
* - password long less than 5 characters
*/
function input_validity(review){
  if(isNaN(review.id) || isNaN(review.id) || isNaN(review.id) || isNaN(review.id.comments.idTask))
    return false;
  if(typeof review.result != true)
    return false;
  if(typeof review.id.comments.comments != "string" || review.id.comments.comments.length < 1)
    return false;
  return true;
}


/*** METHODS ***/
/**
* GET /reviews
* return all the reviews registered in the db.
*/
reviews.get('/', async (req, res) => {
	if (reviews_db.length < 2) {
		res.status(404)
		res.send("No reviews found")
	}
	else{
		res.status(200);
		res.json(reviews_db);
	}
});

/**
* POST /reviews
* If the parameters respect the policy, create a review in the db.
*/
reviews.post('/', async (req, res) => {
	let review = create_review(req)

  if (! (input_validity(review))){
    res.status(400)
    return res.send("invalid input")
  }

  reviews_db.push(review);
  res.location('/'+review.id);
  res.status(201);
  return res.send();
});


module.exports = {
	reviews: reviews
};
