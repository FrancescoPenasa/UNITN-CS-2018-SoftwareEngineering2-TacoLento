const express = require('express');
const bodyParser = require('body-parser');
const exams = express.Router();

exams.use(bodyParser.json());
exams.use(bodyParser.urlencoded({ extended: true }));

/*** DATABASE ***/
var exams_db = [{
  id: 0,
  name: "esame se2",
  date: '27/11/2018',
  deadline: '28/11/2018 18:30',
  questions_N: 10,
  tasklist: [1,2,3,4,5,6,7,8,9,10]
},{
  id: 1,
  name: "esame web",
  date: '30/11/2018',
  deadline: '25/12/2018 18:30',
  questions_N: 2,
  tasklist: [12,13]
}];


/*** FUNCTIONS ***/


/*** METHODS ***/
/**
* GET /exams
* ...
*/
app.get('/exams/', function (req,res){
  res.status(200);
  res.send(exams_db);
});

app.get('/exams/:id', function (req,res){
  var id = req.params.id;

  if(id > exams_db.length || isNaN(id)){
    res.status(400);
    res.send();
  }else{
    res.status(200);
    res.send(exams_db[id]);
  }
});

app.post('/exams/', function (req, res) {
  var exam = req.body;
  exam.id = exams_db.length + 1;
  exam.name = req.body.name;
  exam.date = req.body.date;
  exam.deadline = req.body.deadline;
  exam.questions_N = req.body.questions_N;

  if(isNaN(exam.questions_N)){
    res.status(400);
    res.send("a");
  }else{
    exams_db.push(exam);

    res.location("/exams/" + exam.id); //resource at
    res.status(201);   //created
    res.send();
  }
});


module.exports = {
	exams: exams
};
