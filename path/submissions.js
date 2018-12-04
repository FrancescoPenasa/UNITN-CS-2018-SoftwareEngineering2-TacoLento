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
//-----------------------------
// CREATE A SUBMISSIONS
//-----------------------------
function create_submissions(req)
{
	return submission = 
	{
		id : (submissions_db.lenght),
  		date : req.body.date,
  		userId : req.body.userId,
  		examId : req.body.examId,
  		answers : [req.body.idTask , req.body.answer]
	};
}
//-----------------------------
// CHECK INPUT 
//-----------------------------
function input_validity(submission)
{
	if (isNaN(submission.date) || isNaN(submission.userId) || isNaN(submission.examId) || isNaN(submission.answer.idTask))
		return false
}
//-----------------------------
// CHECK SUBMISSIONS ID
//-----------------------------
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
//-----------------------------
// CHECK USER ID
//-----------------------------
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
//-----------------------------
// CHECK EXAM ID
//-----------------------------
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
//-----------------------------
// DELETE SUBMISSIONS
//-----------------------------
function delete_submissions(sub_Id)
{
 	let sub = submissions_db.find(x => x.id === sub_Id);
  	let index = array.indexOf(sub);
  	submissions_db[index] = {};
}

//-----------------------------
// UPDATE SUBMISSIONS
//-----------------------------
function update_submissions(sub_Id,update_sub)
{
 	let sub = submissions_db.find(x => x.id === sub_Id);
  	let index = array.indexOf(sub);
  	submissions_db[index] = update_sub;
}	



/** VERBS **/
//-----------------------------
// GET /submissions/
//-----------------------------
submissions.get('/submissions/', function (req, res) 
{
	if(submissions_db.lenght==0)
 	{
  		res.status(400)
  		res.send("No submissions found")
 	}
 	else
 	{
  		res.status(200);
  		res.json(submissions_db);
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
    	return res.send("Submissions created");
});

//-----------------------------
// GET /submissions/id
//-----------------------------
submissions.get('/:id', async(req,res) => 
{
	let id = req.params.id;
	if(!(id_validity(id)))
	{
		res.status(400)
		return res.send("invalid id")
	}
	if(id >= submissions_db.lenght)
	{
		res.status(404)
		return res.send("invalid id")
	}
	if(submissions_db.lenght == 0)
	{
		res.status(400)
		return res.send("no submissions on db")
	}
	res.status(302);
	return res.json(submissions_db[id]);
});


//-----------------------------
// PUT /submissions/id
//-----------------------------

submissions.put('/:id', async (req, res) => 
{
	let id = req.params.id;
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
	update_submissions(id,submission);
	res.status(202);
	return res.send("user updated");
});


//-----------------------------
// DELETE /submissions/id
//-----------------------------
submissions.delete('/:id', async(req,res) => {
	let id = req.params.id;
	if(!(id_validity(id)))
	{
		res.status(400)
		return res.send("invalid input")
	}
	if(id >= submissions_db.lenght)
	{
		res.status(404)
		return res.send("invalid id")
	}
	if(submissions_db.lenght == 0)
	{
		res.status(400)
		return res.send("no submissions on db")
	}
	delete_submissions(id);
	res.status(202);
	res.send("user removed");
});

module.exports = {
	submissions: submissions
};
