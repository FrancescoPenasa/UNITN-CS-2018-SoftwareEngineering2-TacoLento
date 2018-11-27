module.exports.set = function(app){

  /**
   * task structure
   */
  var tasks = [{}];

  /**
   * /tasks
   */
  app.get('/tasks/', function (req, res) {
    if(tasks.length < 2) {
      res.status(404)
      res.send("No tasks found")
    }
    else{
      res.status(200);
      res.send(users);
    }
  });

  app.post('/tasks/', function (req, res) {
    var error409 = 0;
    var error400 = 0;
    var task = req.body;
    task.id = tasks.length + 1;
    task.taskType = req.body.taskType
    task.question = req.body.question
    task.subject = req.body.subject

    ///// Look if input is correct /////
    if(task.taskType != "OP" && task.taskType != "SC" && task.taskType != "MC")
      error400 = 1;
    if(task.question == "")
      error400 = 1;
    if(task.subject == "")
      error400 = 1;
    //if(isNaN(task.question) || isNaN(task.subject) || isNaN(task.taskType))

    if(error400 != 0){
        res.status(400)
        res.send("Invalid Input")
    }
    ///////////////////////////

    if( error400 == 0 && error409 == 0){
      tasks.push(task);
      res.location("/tasks/" + tasks.id);
      res.status(201);
      res.send();
    }
  });


}
