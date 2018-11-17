const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//app.use('/', express.static('public'));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log('Example app listening on port '+ PORT));


/**
 * User structure
 */
var users = [{
    id : 1,
    name : "Daniele Birbone",
    description : "class 1 - class 2 - class 3",
    type : "AT"
  },{
    id : 2,
    name : "Giorgio Birba",
    description : "class 1",
    type : "Student"
  }];
  
  
  
  /**
   * GET ALL USERS
   */
  app.get('/users/', function (req, res) {
    res.status(200);
    res.send(users);
  });
  

  /**
   * CREATE
   */
  app.post('/users/', function (req, res) {
    var user = req.body;
    user.id = users.length + 1;
    user.name = req.body.name
    user.description = req.body.description
    user.type = req.body.type
    users.push(user);
    
    res.location("/users/" + users.id); //resource at
    res.status(201);   //created
    res.send();
  });
