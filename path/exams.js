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
  tasks: [1,2,3,4,5,6,7,8,9,10]
},{
  id: 1,
  name: "esame web",
  date: '30/11/2018',
  deadline: '25/12/2018 18:30',
  questions_N: 2,
  tasks: [12,13]
}];


/*** FUNCTIONS ***/

/**
* Create exam
* create an object exam using the parameters from the body of the request.
*/
function create_exam(req){
  return exam = {
    id : (exams_db.length),
    name : req.body.name,
    date : req.body.date,
    deadline : req.body.deadline,
    questions_N : req.body.questions_N,
    tasks : req.body.tasks
  };
}

/**
* Remove exam
* Remove an object exam using the id of the exam.
*/
function remove_exam(exam_id){
  let exam = exams_db.find(x => x.id === exam_id);
  let index = exams_db.indexOf(exam);
  exams_db[index] = {};
}

/**
* Input not valid if
* - name is not a string or is an empty string
* - date is not a string or is an empty string
* - deadline is not a string or is an empty string
* - questions_N is not a number or is less than 1
* - tasks is not an array or is an empty array
*/
function input_validity(exam){
  if(typeof exam.name != "string" || exam.name.length<1)
    return false;
  if(typeof exam.date != "string" || exam.date.length<1)
    return false;
  if(typeof exam.deadline != "string" || exam.deadline.length<1)
    return false;
  if(typeof exam.questions_N != "number" || exam.questions_N<1)
    return false;
  if(typeof exam.tasks != "object" || exam.tasks.length<1)
    return false;

  return true;
}

/**
* Id not valid if
* - id is not a number
* - id is a float
* - id of a deleted exam
*/
function id_validity(id){
  if(isNaN(id))
    return false;
  if(id % 1 != 0)
    return false;
  if(exams_db[id] == {})
    return false;
  return true
}

/*** METHODS ***/
/**
* GET /exams
* Return all the exams stored in the db.
*/
exams.get('/', function (req,res){
  if (exams_db.length < 0) {
    res.status(404)
    res.send("No exams found")
  }
  else{
    res.status(200);
    res.json(exams_db);
  }
});

/**
* GET /exams/id
* Return the exam with the id passed as the parameter.
*/
exams.get('/:id', async (req, res) => {
  let id = req.params.id;
  
  if(!(id_validity(id))){
    res.status(400)
    return res.send()
  }

  if(id >= exams_db.length){
    res.status(404)
    return res.send()
  }

  res.status(200);
  return res.json(exams_db[id]);
});

/**
* POST /exams
* If the parameters respect the policy, create an exam in the db.
*/
exams.post('/', async (req, res) => {
  let exam = create_exam(req)

  if (!(input_validity(exam))){
    res.status(400)
    return res.send("Invalid input")
  }

  exams_db.push(exam);
  res.location('/'+exam.id);
  res.status(201);
  return res.send();
});

/**
* PUT /exams/id
* If the parameters respect the policy, update an exam in the db.
*/
exams.put('/:id', async (req, res) => {
  let id = req.params.id;
  let exam = create_exam(req);

  if(!id_validity(id) || !input_validity(exam)){
    res.status(400)
    return res.send()
  }

  if(id >= exams_db.length){
    res.status(404)
    return res.send()
  }

  exams_db[id] = exam;
  res.status(200);
  res.send();
});

/**
* DELETE /exams/id
* Delete the exam with the id passed as the parameter.
*/
exams.delete('/:id', async (req, res) => {
  let id = req.params.id;

  if(!(id_validity(id))){
    res.status(400)
    return res.send()
  }

  if(id >= exams_db.length){
    res.status(404)
    return res.send()
  }

  remove_exam(id);
  res.status(200);
  res.send();
});

module.exports = {
	exams: exams
};
