const request = require('supertest')
const path = '/reviews'

var app = require('../index');


/*** GET /reviews TEST ***/
test('GET /reviews/ if empty should return 404 ', (done) => {
	request(app).get(path).then((response) => {
    expect(response.statusCode).toBe(404);
    done();
  });
});
test('GET /reviews/ if not empty ' +
		 'should return 200 and the list of registered users ', (done) => {
	request(app)
	.post(path)
	.send({
  	userId : 0,
  	submissionId : 0,
  	result : true,
  	comments : [{
  		idTask : 0,
  		comments : "test"
  	}]
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

/*** POST /reviews TEST ***/
test('POST /reviews/ should return 201', (done) => {
	request(app)
	.post(path)
  .send({
  	userId : 0,
  	submissionId : 0,
  	result : true,
  	comments : [{
  		idTask : 0,
  		comments : "test"
  	}]
  })
  .set('Accept', 'application/json')
  .expect(201)
	done();
});
test('POST /reviews/ with a string as userID should return 400', (done) => {
	request(app)
	.post(path)
  .send({
  	userId : "test",
  	submissionId : 0,
  	result : true,
  	comments : [{
  		idTask : 0,
  		comments : "test"
  	}]
  })
  .set('Accept', 'application/json')
  .expect(400)
	done();
});
test('POST /users/ with a null userId should return 400', (done) => {
	request(app)
	.post(path)
  .send({
    userId : null,
    submissionId : 0,
    result : true,
    comments : [{
      idTask : 0,
      comments : "test"
    }]
  })
  .set('Accept', 'application/json')
  .expect(400)
	done();
});
