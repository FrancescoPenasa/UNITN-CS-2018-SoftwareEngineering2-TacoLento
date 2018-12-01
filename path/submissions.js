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


/**
 * /SUBMISSIONS/ Verbs
 */

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

submissions.post('/submissions/', function (req, res) {
  var submission = req.body;
  var error = 0;
  submission.id = submissions_db.lenght + 1;
  submission.date = req.body.date;
  submission.userId = req.body.userId;
  submission.examId = req.body.examId;
  submission.answers = [req.body.idTask , req.body.answer];

  if(submissions_db.date == "")
  {
    res.status(400);
    error = 1;
  }
  if(submissions_db.userId == null)
  {
    res.status(400);
    error = 1;
  }
  if(submissions_db.examId == null)
  {
    res.status(400);
    error = 1;
  }
  if(submissions_db.answer.idTask == null)
  {
    res.status(400);
    error = 1;
  }

  if (error != 0)
  {
    submissions_db.push(submission);
    res.location("/submissions/" + submission.id);
    res.status(201);
    res.send();
  }
});

module.exports = {
	submissions: submissions
};
