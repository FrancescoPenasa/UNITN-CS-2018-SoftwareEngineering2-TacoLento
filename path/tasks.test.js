const request = require('supertest')
const path = '/tasks'

var app = require('../index');

// EXAMPLE
// /*** GET /tasks TEST ***/
// test('GET /users/ if empty should return 404 ', (done) => {
// 	request(app).get(path).then((response) => {
//     expect(response.statusCode).toBe(404);
//     done();
//   });
// });
//
// test('GET /tasks/ if not empty ' +
// 		 'should return 200 and the list of registered users ', (done) => {
// 	request(app)
// 	.post(path)
// 	.send({
// 		name:			"Francesco",
// 		surname:	"Penasa",
// 		email: 		"francesco.penasa-1@studenti.unitn.it",
// 		password: "hunter2"
// 	})
//   .set('Accept', 'application/json')
//   .expect(201)
// 	.then(r => {
//              return request(app)
// 						 .get(path)
// 						 .then((response) => {
// 							 expect(response.statusCode).toBe(200)
// 						 })})
//   done();
// });
//
// /*** POST /tasks TEST ***/
// test('POST /tasks/ should return 201', (done) => {
// 	request(app)
// 	.post(path)
// 	.send({
// 		name:			"Francesco",
// 		surname:	"Penasa",
// 		email: 		"francesco.penasa-1@studenti.unitn.it",
// 		password: "hunter2"
// 	})
//   .set('Accept', 'application/json')
//   .expect(201)
// 	done();
// });
