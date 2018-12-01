const request = require('supertest')
const path = '/exams'

var app = require('../index');

// EXAMPLE
// /*** GET /exams TEST ***/
// test('GET /users/ if empty should return 404 ', (done) => {
// 	request(app).get(path).then((response) => {
//     expect(response.statusCode).toBe(404);
//     done();
//   });
// });
//
// test('GET /exams/ if not empty ' +
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
// /*** POST /exams TEST ***/
// test('POST /exams/ should return 201', (done) => {
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
//////////





const fetch = require("node-fetch");
const url = 'http://localhost:3000/exams';
//EXAMS
test('get /exams status check', async () => {
	const response = await request(server).get('/exams');
	expect(response.status).toEqual(200);
	//expect(response.text).toContain([{id: 0, name: "esame se2", date: '27/11/2018', deadline: '28/11/2018 18:30', questions_N: 10},{id: 1, name: "esame web", date: '30/11/2018', deadline: '25/12/2018 18:30', questions_N: 2}]);
});


test('get /exams/0 json check', async () => {
	return fetch(url)
		.then(r => r.json())
		.then(data => {
			expect(data[0]).toEqual({
				"id" : 0,
				"name" : "esame se2",
				"date" : "27/11/2018",
				"deadline" : "28/11/2018 18:30",
				questions_N : 10
			})
		})
});

test('get /exams/0 status check', async () => {
	const response = await request(server).get('/exams/0');
	expect(response.status).toEqual(200);
	//expect(response.data).toEqual({id: 123, name: "esame se2", date: '27/11/2018', deadline: '28/11/2018 18:30', questions_N: 10});
});

test('get /exams/examid with id abc', async () => {
	const response = await request(server).get('/exams/abc');
	expect(response.status).toEqual(400);
});

test('get /exams/examid with id 456', async () => {
	const response = await request(server).get('/exams/456');
	expect(response.status).toEqual(400);
});

test('post /exams/examid with questions_N NaN', async () => {
	const response = await request(server).post(
		'/exams',
		{ json: {name: 'Analisi 1', date: '27/11/2018', deadline: '28/11/2018 19:00', questions_N: "abc"} },
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body)
			}
		}
	)
	expect(response.status).toEqual(400);
});

/*
test('put /exams', () => {
	const response = request(server).put('/exams');
	expect (response.status).toEqual(201);
	expect (response.text).toContain([{id: 123, name: "esame se2", date: '27/11/2018', deadline: '28/11/2018 18:30', questions_N: 10},{id: 234, name: "esame web", date: '30/11/2018', deadline: '25/12/2018 18:30', questions_N: 2}]);
});
*/
