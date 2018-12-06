const express = require('express');
const bodyParser = require('body-parser');
const tasks = express.Router();

tasks.use(bodyParser.json());
tasks.use(bodyParser.urlencoded({ extended: true }));

/*** DATABASE ***/
var tasks_db = [{
	id: 0,
  taskType:	"OP",
  question:	"Is this a question?",
  subject: 	"Math"
}];


/*** FUNCTIONS ***/

function inputIsValid(task){
	if(task.taskType != "OP" && task.taskType != "SC" && task.taskType != "MC")
		return false;
	if(task.question == "" || task.question == null)
		return false;
	if(task.subject == "" || task.subject == null)
		return false;
  return true;
}

function idIsValid(id){
  if (isNaN(id) || id == null || id%1 !== 0 || tasks_db[id] == {} || id < 0)
    return false;
  return true;
}

function createTask(req){
  return {
		id : (tasks_db.length),
		taskType : req.body.taskType,
		question : req.body.question,
		subject : req.body.subject
  };
}

function removeTask(id){
  let task = tasks_db.find(x => x.id === id);
  let i = tasks_db.indexOf(task);
  tasks_db[i] = {};
}

/*** METHODS ***/
tasks.get('/', async (req, res) => {
	if(tasks_db.length < 2) {
		res.status(404)
		res.send("No tasks found")
	}
	else{
		res.status(200);
		res.send(tasks_db);
	}
});

tasks.post('/', async (req, res) => {
	let task = createTask(req);

	if(inputIsValid(task)){
		tasks_db.push(task);
		res.location("/" + task.id);
		res.status(201);
		return res.send();
	}else{
		res.status(400)
		return res.send("Invalid Input")
	}
});

tasks.get('/:id', async (req, res) => {
  let id = req.params.id;

  if(! (idIsValid(id))){
    res.status(400)
    return res.send()
  }
  if(id >= tasks_db.length){
    res.status(404)
    return res.send()
  }
  res.status(302);
  return res.json(tasks_db[id]);
});

tasks.put('/:id', async (req, res) => {
  let id = req.params.id;
  let task = createTask(req);
  if(!(idIsValid(id)) || !(inputIsValid(task))){
    res.status(400)
    return res.send()
  }

  if(id >= tasks_db.length){
    res.status(404)
    return res.send()
  }

  tasks_db[id] = task;
  res.status(202);
  res.send();
});

tasks.delete('/:id', async (req, res) => {
  let id = req.params.id;

  if(!(idIsValid(id))){
    res.status(400)
    return res.send()
  }
  if(id >= tasks_db.length){
    res.status(404)
    return res.send()
  }
  removeTask(id);
  res.status(202);
  res.send();
});


module.exports = {
	tasks: tasks
};
