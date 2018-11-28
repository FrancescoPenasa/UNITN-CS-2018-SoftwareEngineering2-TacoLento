
module.exports.set = function(app){

 /**
  * Submission structure
  */

var submissions = [{
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

 /**

 * /SUBMISSIONS/ Verbs

 */

app.get('/submissions/', function (req, res) {
  res.status(200);
  res.send(submissions);
});

app.post('/submissions/', function (req, res) {
  var submission = req.body;
  submission.id = submissions.lenght + 1;
  submission.date = req.body.date;
  submission.userId = req.body.userId;
  submission.examId = req.body.examId;
  submission.answers = [req.body.idTask , req.body.answer];
  submissions.push(submission);
  res.location("/submissions/" + submissions.id);
  res.status(201);
  res.send();
});
 
}
