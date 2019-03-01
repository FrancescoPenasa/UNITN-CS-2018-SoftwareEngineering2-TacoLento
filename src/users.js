const express = require('express');
const bodyParser = require('body-parser');
const users = express.Router();

users.use(bodyParser.json());
users.use(bodyParser.urlencoded({ extended: true }));

/*** DATABASE ***/
/**
* users_db is a collection of user objects.
* user = {
* id : Integer,
* name : String,
* surname : String,
* email : String,
* password : String
* }
*/
var users_db = [{
  id : 0,
  name:	"admin",
  surname: "admin",
  email: "admin@admin.it",
  password: "admin"
}];


/*** FUNCTIONS ***/
/**
* Create user
* create an object user using the parameters from the body of the request.
*/
function create_user(req){
  return {
    id : (users_db.length),
    name : req.body.name,
    surname : req.body.surname,
    email : req.body.email,
    password : req.body.password
  };
}

/**
* Input not valid if
* - name or surname or email is not a String
* - name or surname or email is null or empty
* - password long less than 5 characters
*/
function input_validity(user){
  if (!(isNaN(user.name) && isNaN(user.surname) && isNaN(user.email)))
    return false
  if (!((user.name)!=null && (user.surname)!=null && (user.email)!=null))
    return false
  if (!((user.name.length)>0 && (user.surname.length)>0 && (user.email.length)>0))
    return false
  if (user.password.length < 5)
    return false
  return true
}

/**
* Id not valid if
* - id is not a number
* - id is a float
* - id is null
* - id is a negative integer
* - id of a deleted user
*/
function id_validity(id){
  if ((isNaN(id)))
    return false
  if (id==null)
    return false
  if (id % 1 !== 0)
    return false
  if(id < 0)
    return false
  if (users_db[id] == {})
    return false
  return true
}

/**
* Email not valid if
* - there is already an user with the same email in the db.
*/
function email_validity(user_email){
  for (var i = 1; i < users_db.length; i++){
    if (users_db.email == user_email)
      return false
    }
  return true
}


/**
* Email not valid if
* - there is already an user with the same email in the db.
*/
function remove_user(user_id){
  let user = users_db.find(x => x.id === user_id);
  let index = array.indexOf(user);
  users_db[index] = {};
}

/*** METHODS ***/
/**
* GET /users
* return all the users registered in the db.
*/
//TODO: DON'T SHOW PASSWORDS
users.get('/', async (req, res) => {
  if (users_db.length < 2) {
    res.status(404)
    res.send("No users found")
  }
  else{
    res.status(200);
    res.json(users_db);
  }
});

/**
* POST /users
* If the parameters respect the policy, create a user in the db.
*/
users.post('/', async (req, res) => {
  let user = create_user(req)

  if (! (input_validity(user))){
    res.status(400)
    return res.send("invalid input")
  }

  if (! (email_validity(user.email))){
    res.status(409)
    return res.send("email already exist")
  }

  users_db.push(user);
  res.location('/'+user.id);
  res.status(201);
  return res.send();
});

/**
* GET /users/id
*
*/
users.get('/:id', async (req, res) => {
  let id = req.params.id;

  if(! (id_validity(id))){
    res.status(400)
    return res.send()
  }
  if(id >= users_db.length){
    res.status(404)
    return res.send()
  }
  res.status(302);
  return res.json(users_db[id]);
});

/**
* PUT /users/id
* 202 400 404
*/
users.put('/:id', async (req, res) => {
  let id = req.params.id;
  let user = create_user(req);
  if(!(id_validity(id)) && !(input_validity(user))){
    res.status(400)
    return res.send()
  }

  if(id >= users_db.length){
    res.status(404)
    return res.send()
  }

  users_db[id] = user;
  res.status(202);
  res.send();
});

/**
* DELETE /users/id
* 202 400 404
*/
users.delete('/:id', async (req, res) => {
  let id = req.params.id;

  if(!(id_validity(id))){
    res.status(400)
    return res.send()
  }
  if(id >= users_db.length){
    res.status(404)
    return res.send()
  }
  remove_user(id);
  res.status(202);
  res.send();
});


module.exports = {
	users: users
};
