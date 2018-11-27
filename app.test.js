const request = require('supertest');
const server = require('./app').app;
const fetch = require("node-fetch");
const url = 'http://localhost:3001/exams';
/*
const submissionsId = require(' ./submissions/subid');
const examId = require('./exams/examid');
*/

//const exam = require('./exams');

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
//SUBMISSIONS
test('get /submissions/subid', () => {
	const response = request(server).get('/submissions/123');
	expect (response.status).toEqual(201);
	expect (response.text).toContain([{id: 123, date: '23 novembre 2018', userId: 321, examId: 1, answer: [{idTask: 1, answer: 'test'}]}]);
});

test('get /submissions/subid', () => {
	const response = request(server).get('/submissions/abc');
	expect(response.status).toEqual(400);
});

test('get /submission/subid', () => {
	const response = request(server).get('/submissions/456');
	expect(response.status).toEqual(404);
});

test('put /submission/subid', () => {
	const response = request(server).put('/submissions/123');
	expect(response.status).toEqual(201);
});

test('put /submission/subid', () => {
	const response = request(server).put('/submissions/abc');
	expect(response.status).toEqual(400);
});

test('put /submissions/subid', () => {
	const response = request(server).put('/submissions/456');
	expect(response.status).toEqual(404);
});

test('delete /submission/subid', () => {
const response = request(server).delete('/submissions/123');
expect(response.status).toEqual(201);
});

test('delete /submission/subid', () => {
const response = request(server).delete('/submissions/abc');
expect(response.status).toEqual(400);
});

test('delete /submissions/subid', () => {
const response = request(server).delete('/submissions/456');
expect(response.status).toEqual(404);
});

//const submissions = require(' ./submissions');