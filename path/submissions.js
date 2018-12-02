const express = require('express');
const bodyParser = require('body-parser');
const submissions = express.Router();

submissions.use(bodyParser.json());
submissions.use(bodyParser.urlencoded({ extended: true }));

/*** DATABASE ***/
var submissions_db = [{
  id : 1,
  date : "27/11/2018",
  userId : 1,
  examId : 1,
  answer: [1,"test"]
},{
  id : 2,
  date : "28/11/2018",
  userId : 2,
  examId : 1,
  answer: [1,"test"]
}];


/*** FUNCTIONS ***/
/*** create a new submissions ***/
function create_submissions(req)
{
	return submissions = 
	{
		id : (submissions_db.lenght),
  		date : req.body.date,
  		userId : req.body.userId,
  		examId : req.body.examId,
  		answers : [req.body.idTask , req.body.answer]
	};
}

function input_validity(submissions)
{
	if (isNaN(submissions.date) || isNaN(submissions.userId) || isNaN(submissions.examId) || isNaN(submissions.answer.idTask))
		return false
}

function input_validity(id)
{
	if(!(isNaN(id)))
		return false
	if(id == null)
		return false
	if(id % 1 !== 0)
		return false
	if(submissions_db[id] = {})
		return false
	return true
}

function userId_validity(userId)
{
	if(!(isNaN(userId)))
		return false
	if(userId == null)
		return false
	if(userId % 1 !== 0)
		return false
	return true
}

function examId_validity(examId)
{
	if(!(isNaN(examId)))
		return false
	if(examId == null)
		return false
	if(examId % 1 !== 0)
		return false
	return true
}

function delete_submissions(sub_Id)
{
 	let sub = submissions_db.find(x => x.id === submissions_id);
  	let index = array.indexOf(sub);
  	submissions_db[index] = {};
}	


/**
 * /SUBMISSIONS/ Verbs
 */

//-----------------------------
// GET /submissions/
//-----------------------------
submissions.get('/submissions/', function (req, res) {
 if(submissions_db.lenght==0)
 {
  res.status(400)
  res.send("No submissions found")
 }
 else
 {
  res.status(200);
  res.send(submissions_db);
 }
});

//-----------------------------
// POST /submissions/
//-----------------------------

submissions.post('/submissions/', function (req, res) 
{
	let submission = create_submissions(req)
	if(!(input_validity(submission)))
  	{
		res.status(400)
		return res.send("invalid input")
	}
	if(!(userId_validity(submission.userId)))
	{
		res.status(400)
		return res.send("invalid userId")
	}
	if(!(examId_validity(submission.examId)))
	{
		res.status(400)
		return res.send("invalid examId")
	}
	
	submissions_db.push(submission);
    	res.location("/" + submission.id);
    	res.status(201);
    	return res.send();
  	}
});

module.exports = {
	submissions: submissions
};
