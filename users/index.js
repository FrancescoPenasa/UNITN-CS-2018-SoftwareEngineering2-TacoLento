module.exports.set = function(app) {
    
/**************************** /USERS/ *****************************/    
/**
 * users structure
 */
var users = [{}];
  
  /**
   * GET /USERS/
   * get all users registered in the database
   */
  app.get('/users/', function (req, res) {
    if(users.length < 2) {
      res.status(404)
      res.send("No users found")
    }
    else{
      res.status(200);
      res.send(users);
    }
  });
  

  /**
   * POST /USERS
   * create a new user in the database.
   */
  app.post('/users/', function (req, res) {
    var error409 = 0;
    var error400 = 0;
    var user = req.body;
    user.id = users.length + 1;
    
    
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.email = req.body.email;
    user.password = req.body.password;

    //look if input is valid
    if(user.name == "")
      error400 = 1;
    if(user.password.length < 4)
      error400 = 1;
    //Invalid input
    if(error400 != 0){
        res.status(400)
        res.send("Invalid Input")
    }

    
    //look if email already exists
    for(var i = 0; i<users.length; i++)
      if (user.email == users[i].email){
        error409 = 1;
      }

    //response email already exists
    if(error409 != 0){
      res.status(409)
      res.send("email already exists");
    }
    
    

     

    if( error400 == 0 && error409 == 0){
      users.push(user);
      res.location("/users/" + users.id); //resource at
      res.status(201);   //created
      res.send();
    }
  });

/********************************* /USERS/:id *******************/

  
  // app.get('/users/:id', function (req, res) {
  //   var id = req.params.id;
  
  //   if (id > users.length || id < 1) {
  //     res.status(404).send();
  //     return;
  //   }

  //   res.status(200)
  //   res.send(users[id]);
  // });


  /** 
  {
    id: 0,
    name: "Franco",
    surname: "Francone",
    email: "franco.francescone@gmail.com",
    password: "francomitico2"
  },{id: 1,
  name: "Pranco",
  surname: "Prancone",
  email: "Pranco.francescone@gmail.com",
  password: "prancomitico2"
  }**/

  //module.exports = {app};
}
