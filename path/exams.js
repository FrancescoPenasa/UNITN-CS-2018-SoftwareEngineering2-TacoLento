const express = require('express');
const bodyParser = require('body-parser');
const exams = express.Router();

exams.use(bodyParser.json());
exams.use(bodyParser.urlencoded({ extended: true }));

/*** DATABASE ***/
var exams_db = [{
  id: 0,
  name: "Esame Ingegneria del Software 2",
  date: '27/11/2018',
  deadline: '28/11/2018 18:30',
  tasks: [1,2,3,4,5,6,7,8,9,10]
},{
  id: 1,
  name: "Esame di Programmazione Web",
  date: '30/11/2018',
  deadline: '25/12/2018 18:30',
  tasks: [12,13]
}];

/*** FUNCTIONS ***/

/**
* Create exam
* create an object exam using the parameters from the body of the request.
*/
function create_exam(req){
  return {
    id : (exams_db.length),
    name : req.body.name,
    date : req.body.date,
    deadline : req.body.deadline,
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
* - tasks is not an array or is an empty array
*/
function input_validity(exam){
  if(typeof exam.name != "string" || exam.name.length<1)
    return false;
  if(typeof exam.date != "string" || exam.date.length<1)
    return false;
  if(typeof exam.deadline != "string" || exam.deadline.length<1)
    return false;
  if(typeof exam.tasks != "object" || exam.tasks.length<1)
    return false;

  return true;
}

/**
* Id not valid if:
* - id is not a number                    -> 400 Bad Request
* - id is a float                         -> 400 Bad Request
* - id is a negative number               -> 400 Bad Request
* - id is greater than the array length   -> 404 Not Found
* - id of a deleted exam                  -> 410 Gone
*/
function id_validity(id){
  if(isNaN(id))
    return 400;
  if(id % 1 != 0)
    return 400;
  if(id < 0)
    return 400;
  if(id >= exams_db.length)
    return 404;
  if(exams_db[id] == {})
    return 410;

  return 1;
}

/*** METHODS ***/

/**
* GET /exams
* Return all the exams stored in the db.
*/
exams.get('/', function (req,res){
  if (exams_db.length < 0) {
    res.status(404);
    return res.send("No exams found");
  }
  else{
    res.status(200);
    return res.json(exams_db);
  }
});

/**
* GET /exams/id
* Return the exam with the id passed as the parameter.
*/
exams.get('/:id', async (req, res) => {
  let id = req.params.id;
  let id_val = id_validity(id);

  if(id_val == 1){
    res.status(200);
    return res.json(exams_db[id]);
  }else{
    res.status(id_val)
    return res.send("Invalid id");
  }
});

/**
* POST /exams
* If the parameters respect the policy, create an exam in the db.
*/
exams.post('/', async (req, res) => {
  let exam = create_exam(req)

  if(input_validity(exam) == 1){
    exams_db.push(exam);
    res.location('/'+exam.id);
    res.status(201);
    return res.send("Exam created");
  }else{
    res.status(400);
    return res.send("Invalid input");
  }
});

/**
* PUT /exams/id
* If the parameters respect the policy, update an exam in the db.
*/
exams.put('/:id', async (req, res) => {
  let id = req.params.id;
  let id_val = id_validity(id);
  let exam = create_exam(req);

  if(id_val == 1 && input_validity(exam)){
    exams_db[id] = exam;
    res.status(200);
    return res.send("Exam updated");
  }else{
    res.status(id_val);
    return res.send("Invalid input");
  }
});

/**
* DELETE /exams/id
* Delete the exam with the id passed as the parameter.
*/
exams.delete('/:id', async (req, res) => {
  let id = req.params.id;
  let id_val = id_validity(id);

  if(id_val == 1){
    remove_exam(id);
    res.status(200);
    return res.send("Exam deleted");
  }else{
    res.status(id_val);
    return res.send("Invalid input");
  }
});

module.exports = {
	exams: exams
};