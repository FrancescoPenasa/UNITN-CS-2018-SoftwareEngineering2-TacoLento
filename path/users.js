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
var users_db = [{}];


/*** FUNCTIONS ***/
/**
* Create user
* create an object user using the parameters from the body of the request.
*/
function create_user(req){
  return user = {
    id : (users_db.length + 1),
    name : req.body.name,
    surname : req.body.surname,
    email : req.body.email,
    password : req.body.password
  };
}

/**
* Input not valid if
* - name or surname or email is not a String
* - name or surnam or email is null
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
* Email not valid if
* - there is already an user with the same email in the db.
*/
function email_validity(email){
  for (var i = 1; i < users_db.length; i++){
    if (users_db.email == email)
      return false
    }
  return true
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
  let user = create_user(req);

  if (! input_validity(user)){
    res.status(400)
    return res.send("invalid input")
  }

  if (! email_validity(email)){
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


  res.status(200);
  res.json(users_db);
});

/**
* PUT /users/id
*
*/
users.put('/:id', async (req, res) => {
  let id = req.params.id;


  res.status(200);
  res.json(users_db);
});

/**
* DELETE /users/id
*
*/
users.delete('/:id', async (req, res) => {
  let id = req.params.id;


  res.status(200);
  res.json(users_db);
});

module.exports = {
	users: users
};
