const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//app.use('/', express.static('public'));

app.get('/', (req, res) => res.send('Hello World!'));

/**
 * Exam structure
 */
var exams = [{
  id: 0,
  name: "esame se2",
  date: '27/11/2018',
  deadline: '28/11/2018 18:30',
  questions_N: 10
},{
  id: 1,
  name: "esame web",
  date: '30/11/2018',
  deadline: '25/12/2018 18:30',
  questions_N: 2
}];

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

app.get('/exams/', function (req,res){
  res.status(200);
  res.send(exams);
});

app.get('/exams/:id', function (req,res){
  var id = req.params.id;

  if(id > exams.length || isNaN(id)){
    res.status(400);
    res.send();
  }else{
    res.status(200);
    res.send(exams[id]);
  }
});

app.post('/exams/', function (req, res) {
  var exam = req.body;
  exam.id = exams.length + 1;
  exam.name = req.body.name;
  exam.date = req.body.date;
  exam.deadline = req.body.deadline;
  exam.questions_N = req.body.questions_N;

  if(isNaN(exam.questions_N)){
    res.status(400);
    res.send("a");
  }else{
    exams.push(exam);

    res.location("/exams/" + exams.id); //resource at
    res.status(201);   //created
    res.send();
  }
});

/**
 * USERS
 */
var users_app = require('./users');
users_app.set(app);

/**
 * TASKS
 */
var tasks_app = require('./tasks');
tasks_app.set(app);


/**
 * /SUBMISSIONS
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

module.exports = {app};

app.listen(PORT, () => console.log('Example app listening on port '+ PORT));
