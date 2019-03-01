const request = require('supertest')
const path = '/users'

var app = require('../index');

// beforeAll(function () {
//    app = require('../index');
// });
// afterAll(function () {
//    app.close();
// });

/*** GET /users TEST ***/
test('GET /users/ if empty should return 404 ', (done) => {
	request(app).get(path).then((response) => {
    expect(response.statusCode).toBe(404);
    done();
  });
});
test('GET /users/ if not empty ' +
		 'should return 200 and the list of registered users ', (done) => {
	request(app)
	.post(path)
	.send({
		name:			"Francesco",
		surname:	"Penasa",
		email: 		"francesco.penasa-1@studenti.unitn.it",
		password: "hunter2"
	})
  .set('Accept', 'application/json')
  .expect(201)
	.then(r => {
             return request(app)
						 .get(path)
						 .then((response) => {
							 expect(response.statusCode).toBe(200)
						 })})
  done();
});


/*** POST /users TEST ***/
test('POST /users/ should return 201', (done) => {
	request(app)
	.post(path)
	.send({
		name:			"Francesco",
		surname:	"Penasa",
		email: 		"francesco.penasa-1@studenti.unitn.it",
		password: "hunter2"
	})
  .set('Accept', 'application/json')
  .expect(201)
	done();
});
test('POST /users/ with a number as name should return 400', (done) => {
	request(app)
	.post(path)
	.send({
		name:			"123",
		surname:	"Penasa",
		email: 		"francesco.penasa-1@studenti.unitn.it",
		password: "hunter2"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});
test('POST /users/ with a number as surname should return 400', (done) => {
	request(app)
	.post(path)
	.send({
		name:			"Francesco",
		surname:	"123",
		email: 		"francesco.penasa-1@studenti.unitn.it",
		password: "hunter2"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});
test('POST /users/ with a number as email should return 400', (done) => {
	request(app)
	.post(path)
	.send({
		name:			"Francesco",
		surname:	"Penasa",
		email: 		"123",
		password: "hunter2"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});
test('POST /users/ with a short password should return 400', (done) => {
	request(app)
	.post(path)
	.send({
		name:			"Francesco",
		surname:	"Penasa",
		email: 		"francesco.penasa-1@studenti.unitn.it",
		password: "app"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});
test('POST /users/ with a null name should return 400', (done) => {
	request(app)
	.post(path)
	.send({
		name:			null,
		surname:	"Penasa",
		email: 		"francesco.penasa-1@studenti.unitn.it",
		password: "hunter2"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});
test('POST /users/ with a null surname should return 400', (done) => {
	request(app)
	.post(path)
	.send({
		name:			"Francesco",
		surname:	null,
		email: 		"francesco.penasa-1@studenti.unitn.it",
		password: "hunter2"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});
test('POST /users/ with a null email should return 400', (done) => {
	request(app)
	.post(path)
	.send({
		name:			"Francesco",
		surname:	"Penasa",
		email: 		null,
		password: "hunter2"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});
test('POST /users/ with a null password should return 400', (done) => {
	request(app)
	.post(path)
	.send({
		name:			"123",
		surname:	"Penasa",
		email: 		"francesco.penasa-1@studenti.unitn.it",
		password: null
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});
test('POST /users/ with an empty name should return 400', (done) => {
	request(app)
	.post(path)
	.send({
		surname:	"Penasa",
		email: 		"francesco.penasa-1@studenti.unitn.it",
		password: "hunter2"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});
test('POST /users/ with an empty surname should return 400', (done) => {
	request(app)
	.post(path)
	.send({
		name:			"Francesco",
		email: 		"francesco.penasa-1@studenti.unitn.it",
		password: "hunter2"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});
test('POST /users/ with an empty email should return 400', (done) => {
	request(app)
	.post(path)
	.send({
		name:			"Francesco",
		surname:	"Penasa",
		password: "hunter2"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});
test('POST /users/ with an empty password should return 400', (done) => {
	request(app)
	.post(path)
	.send({
		name:			"123",
		surname:	"Penasa",
		email: 		"francesco.penasa-1@studenti.unitn.it"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});
test('POST /users/ with email already registered ' +
		 'should return 409', (done) => {
	request(app)
	.post(path)
	.send({
		name:			"Francesco",
		surname:	"Penasa",
		email: 		"francesco.penasa-1@studenti.unitn.it",
		password: "hunter2"
	})
  .set('Accept', 'application/json')
  .expect(201)
	.then(r => {
             return request(app)
						 .post(path)
						 .send({
					 		name:			"Mr",
					 		surname:	"Hacker",
					 		email: 		"francesco.penasa-1@studenti.unitn.it",
					 		password: "hunter1"
					 	})
						 .then((response) => {
							 expect(response.statusCode).toBe(409)
						 })
					 })
  done();
});


/*** GET /users/:id TEST ***/
test('GET /users/:id if user exist should return 302', (done) => {
	request(app)
	.post(path)
	.send({
		name:			"Francesco",
		surname:	"Penasa",
		email: 		"francesco.penasa-1@studenti.unitn.it",
		password: "hunter2"
	})
  .set('Accept', 'application/json')
  .expect(201)
	.then(r => {
             return request(app)
						 .get(path+'/1')
						 .then((response) => {
							 expect(response.statusCode).toBe(302)
						 })
					 })
  done();
});
test('GET /users/:id if id isNaN should return 400 ', (done) => {
	request(app).get(path+'/sda').then((response) => {
    expect(response.statusCode).toBe(400);
	});
	done();
});

 test('GET /users/:id if id is a float should return 400 ', (done) => {
 	request(app).get(path+'/0.1').then((response) => {
     expect(response.statusCode).toBe(400);
	 });
	 done();
 });
 test("GET /users/:id if user don't exist should return 404", (done) => {
 	request(app).get(path+'/5').then((response) => {
     expect(response.statusCode).toBe(404);
	 });
	 done();
 });
 test("GET /users/:id if id is negative integer should return 400", (done) => {
	request(app).get(path+'/-1').then((response) => {
		expect(response.statusCode).toBe(400);
	});
	done();
});

/*** PUT /users/:id TEST ***/
test('PUT /users/:id if user exist '+
	   'and input is valid should return 202', (done) => {request(app)
	.post(path)
	.send({
		name:			"Nome",
		surname:	"Cognome",
		email: 		"email@email.it",
		password: "password"
	})
  .set('Accept', 'application/json')
  .expect(201)
	.then(r => {
             return request(app)
						 .put(path+'/1')
						 .send({
					 			name:			"Francesco",
								surname:	"Penasa",
								email: 		"francesco.penasa-1@studenti.unitn.it",
								password: "hunter2"
					 	})
						 .set('Accept', 'application/json')
					   .expect(202)
						 })
  done();
});
test('PUT /users/:id if user exist '+
		 'and input is not valid should return 400', (done) => {request(app)
	.post(path)
	.send({
		name:			"Nome",
		surname:	"Cognome",
		email: 		"email@email.it",
		password: "password"
	})
  .set('Accept', 'application/json')
  .expect(201)
	.then(r => {
             return request(app)
						 .put(path+'/1')
						 .send({
					 			name:			"123",
								surname:	"Penasa",
								email: 		"francesco.penasa-1@studenti.unitn.it",
								password: "hunter2"
					 	})
						 .set('Accept', 'application/json')
					   .expect(400)
						 })
  done();
});
test("PUT /users/:id if don't exist should return 404", (done) => {
	request(app)
	.put(path+'/999')
	.send({
		 name: "Francesco",
		 surname:	"Penasa",
		 email: "francesco.penasa-1@studenti.unitn.it",
		 password: "hunter2"
 })
	.set('Accept', 'application/json')
	.expect(404)
  done();
});


/*** DELETE /users/:id TEST ***/
test("DELETE /users/:id if user exist should return 202", (done) => {
	request(app)
	.post(path)
	.send({
 		name:			"Nome",
 		surname:	"Cognome",
 		email: 		"email@email.it",
 		password: "password"
	})
	.set('Accept', 'application/json')
	.expect(201)
	.then(r => {
					return request(app)
					.delete(path+'/1')
					.set('Accept', 'application/json')
					.expect(202)
					})
done();
});
test("DELETE /users/:id if id isNaN should return 400", (done) => {
	request(app)
	.post(path)
	.send({
 		name:			"Nome",
 		surname:	"Cognome",
 		email: 		"email@email.it",
 		password: "password"
	})
	.set('Accept', 'application/json')
	.expect(201)
	.then(r => {
					return request(app)
					.delete(path+'/asda')
					.set('Accept', 'application/json')
					.expect(400)
					})
done();
});
test("DELETE /users/:id if id isFloat should return 400", (done) => {
	request(app)
	.post(path)
	.send({
 		name:			"Nome",
 		surname:	"Cognome",
 		email: 		"email@email.it",
 		password: "password"
	})
	.set('Accept', 'application/json')
	.expect(201)
	.then(r => {
					return request(app)
					.delete(path+'/1.232')
					.set('Accept', 'application/json')
					.expect(400)
					})
done();
});
test("DELETE /users/:id if don't exist should return 404", (done) => {
	request(app)
	.delete(path+'/999')
	.send({
		 name: "Francesco",
		 surname:	"Penasa",
		 email: "francesco.penasa-1@studenti.unitn.it",
		 password: "hunter2"
 })
	.set('Accept', 'application/json')
	.expect(404)
  done();
});
