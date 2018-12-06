//
//      TEST CASES FOR TASKS FUNCTIONS
//

const request = require('supertest')
const path = '/tasks'

var app = require('../index');

var validInput = {
  taskType:	"OP",
  question:	"Is this a question?",
  subject: 	"Math"
}

var validInput2 = {
  taskType:	"MC",
  question:	"Sierra alfa tango alfa november?",
  subject: 	"Math"
}

/*******    TSET CASES: GET /tsaks/     *******/

test('GET /tasks/ Should return 404 if tasks is an empty set', (done) => {
	request(app).get(path).then((response) => {
    expect(response.statusCode).toBe(404)

    done()
  });
});

test('GET /tasks/ Should return 200 and the list of all the tasks ', (done) => {
	request(app)
	.post(path)
	.send({
    taskType:	"OP",
    question:	"Is this a question?",
    subject: 	"Math"
  })
  .set('Accept', 'application/json')
  .expect(201)
	.then(r => {
     return request(app)
		 .get(path)
		 .then((response) => {
			 expect(response.statusCode).toBe(200)
       done()
		 })
  })
});

/*******    TSET CASES: POST /tsaks/     *******/

test('POST /tasks/ should insert the new task and return 201', (done) => {
	request(app)
	.post(path)
	.send(validInput)
  .set('Accept', 'application/json')
  .expect(201)
	done()
});

test('POST /tasks/ should return 400 because taskType is empty', (done) => {
	request(app)
	.post(path)
	.send({
    taskType:	"",
    question:	"Is this a question?",
    subject: 	"Math"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done()
});

test('POST /tasks/ should return 400 because tasktype is not "MC","OP" or "SC" ', (done) => {
	request(app)
	.post(path)
	.send({
    taskType:	"A1",
    question:	"Is this a question?",
    subject: 	"Math"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done()
});
test('POST /tasks/ should return 400 because taskType is null', (done) => {
	request(app)
	.post(path)
	.send({
    taskType:	null,
    question:	"Is this a question?",
    subject: 	"Math"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done()
});
test('POST /tasks/ should return 400 because question is empty', (done) => {
	request(app)
	.post(path)
	.send({
    taskType:	"OP",
    question:	"",
    subject: 	"Math"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done()
});

test('POST /tasks/ should return 400 because question is null', (done) => {
	request(app)
	.post(path)
	.send({
    taskType:	"OP",
    question:	null,
    subject: 	"Math"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done()
});

test('POST /tasks/ should return 400 because subject is an empty string', (done) => {
	request(app)
	.post(path)
	.send({
    taskType:	"OP",
    question:	"Is this a question?",
    subject: 	""
	})
  .set('Accept', 'application/json')
  .expect(400)
	done()
});

test('POST /tasks/ should return 400 because subject is null', (done) => {
	request(app)
	.post(path)
	.send({
    taskType:	"OP",
    question:	"Is this a question?",
    subject: 	null
	})
  .set('Accept', 'application/json')
  .expect(400)
	done()
});



/*******    TSET CASES: GET /tsaks/:id    *******/

test('GET /tasks/:id if id is NaN should return 400 ', (done) => {
	request(app).get(path+'/aaaa').then((response) => {
    expect(response.statusCode).toBe(400);
    done()
  });
});

test('GET /tasks/:id should return 302 if task exist', (done) => {
	request(app)
	.post(path)
	.send(validInput)
  .set('Accept', 'application/json')
  .expect(201)
	.then(r => {
     return request(app)
		 .get(path+'/1')
		 .then((response) => {
			 expect(response.statusCode).toBe(302)
       done()
		 })
	})
});


/*******    TSET CASES: GET /tsaks/:id    *******/

test('PUT /tasks/:id if task exist and input is valid should return 202', (done) => {request(app)
	.post(path)
	.send(validInput)
  .set('Accept', 'application/json')
  .expect(201)
	.then(r => {
     return request(app)
		 .put(path+'/1')
		 .send(validInput2)
		 .set('Accept', 'application/json')
	   .expect(202)
		 })
  done()
});

test('PUT /tasks/:id if task exist and input is not valid should return 400', (done) => {request(app)
	.post(path)
	.send(validInput)
  .set('Accept', 'application/json')
  .expect(201)
	.then(r => {
     return request(app)
		 .put(path+'/1')
		 .send({
       taskType:	"OP",
       question:	"Is this a question?",
       subject: 	null
     })
		 .set('Accept', 'application/json')
	   .expect(400)
	})
  done()
});

test("PUT /tasks/:id if don't exist should return 404", (done) => {
	request(app)
	.put(path+'/9999')
	.send(validInput)
	.set('Accept', 'application/json')
	.expect(404)
  done()
});


/*** DELETE /tasks/:id TEST ***/
test("DELETE /tasks/:id if task exist should return 202", (done) => {
	request(app)
	.post(path)
	.send(validInput)
	.set('Accept', 'application/json')
	.expect(201)
	.then(r => {
		return request(app)
		.delete(path+'/1')
		.set('Accept', 'application/json')
		.expect(202)
	})
  done()
});

test("DELETE /tasks/:id if id isNaN should return 400", (done) => {
	request(app)
	.post(path)
	.send(validInput)
	.set('Accept', 'application/json')
	.expect(201)
	.then(r => {
		return request(app)
		.delete(path+'/aaaaa')
		.set('Accept', 'application/json')
		.expect(400)
	})
  done()
});

test("DELETE /tasks/:id if id isFloat should return 400", (done) => {
	request(app)
	.post(path)
	.send(validInput)
	.set('Accept', 'application/json')
	.expect(201)
	.then(r => {
		return request(app)
		.delete(path+'/3.14')
		.set('Accept', 'application/json')
		.expect(400)
	})
  done()
});

test("DELETE /tasks/:id should return 404 if don't exist ", (done) => {
	request(app)
	.delete(path+'/99999')
	.send(validInput)
	.set('Accept', 'application/json')
	.expect(404)
  done()
});
