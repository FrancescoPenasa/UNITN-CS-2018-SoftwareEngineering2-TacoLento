const request = require('supertest');
const server = require('./app');
/*
const submissionsId = require(' ./submissions/subid');
const examId = require('./exams/examid');
*/

//const exam = require('./exams');

//EXAMS
test('get /exams/examid with id 123', () => {
	const response = request(server).get('/exams/0');
	expect (response.status).toEqual(200);
	expect (response.text).toContain([{id: 123, name: "esame se2", date: '27/11/2018', deadline: '28/11/2018 18:30', questions_N: 10}]);
});

test('get /exams/examid with id abc', () => {
	const response = request(server).get('/exams/abc');
	expect(response.status).toEqual(400);
});

test('get /exams/examid with id 456', () => {
	const response = request(server).get('/exams/456');
	expect(response.status).toEqual(400);
});

test('post /exams/examid with id 789', () => {
	const response = request(server).post('/submissions/789');
	expect(response.status).toEqual(201);
});

test('post /exams/examid with id abc', () => {
	const response = request(server).post('/submissions/abc');
	expect(response.status).toEqual(400);
});

test('post /exams/examid with id 123', () => {
	const response = request(server).post('/submissions/123');
	expect(response.status).toEqual(404);
});

test('get /exams', () => {
	const response = request(server).get('/exams');
	expect (response.status).toEqual(200);
	expect (response.text).toContain([{id: 0, name: "esame se2", date: '27/11/2018', deadline: '28/11/2018 18:30', questions_N: 10},{id: 1, name: "esame web", date: '30/11/2018', deadline: '25/12/2018 18:30', questions_N: 2}]);
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