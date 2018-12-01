const request = require('supertest')
const path = '/reviews'

var app = require('../index');

// EXAMPLE
// /*** GET /reviews TEST ***/
// test('GET /users/ if empty should return 404 ', (done) => {
// 	request(app).get(path).then((response) => {
//     expect(response.statusCode).toBe(404);
//     done();
//   });
// });
//
// test('GET /reviews/ if not empty ' +
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
// /*** POST /reviews TEST ***/
// test('POST /reviews/ should return 201', (done) => {
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
