const request = require('supertest');
const fetch = require("node-fetch");
const app = require('../app').app;
const url = "http://localhost:3000/submissions"

test('get /submissions/', () => {
	const response = request(app).get('/submissions/');
	expect (response.status).toEqual(201);
	expect (response.text).toContain([{id: 1, date: '23 novembre 2018', userId: 1, examId: 1, answer: [{idTask: 1, answer: 'test'}]}]);
});

test('post /submissions/ return 201', () => {
	return fetch(url, {
		method: 'post',
			body: JSON.stringify({
				"date": "27/10/2018",
				"userId": 1,
				"examId": 1,
				"answer": [1,"test"]}),
			headers: {
				'Content-Type': 'application/json',
			},
	})
	.then(r => expect(r.status).toEqual(201));
});

test('get /submissions/subid', () => {
	const response = request(app).get('/submissions/1');
	expect (response.status).toEqual(201);
	expect (response.text).toContain([{id: 1, date: '23 novembre 2018', userId: 1, examId: 1, answer: [{idTask: 1, answer: 'test'}]}]);
});

test('get /submissions/subid', () => {
	const response = request(app).get('/submissions/abc');
	expect(response.status).toEqual(400);
});

test('get /submission/subid', () => {
	const response = request(app).get('/submissions/456');
	expect(response.status).toEqual(404);
});

test('put /submission/subid', () => {
	const response = request(app).put('/submissions/1');
	expect(response.status).toEqual(201);
});

test('put /submission/subid', () => {
	const response = request(app).put('/submissions/abc');
	expect(response.status).toEqual(400);
});

test('put /submissions/subid', () => {
	const response = request(app).put('/submissions/456');
	expect(response.status).toEqual(404);
});

test('delete /submission/subid', () => {
	const response = request(app).delete('/submissions/1');
	expect(response.status).toEqual(201);
});

test('delete /submission/subid', () => {
	const response = request(app).delete('/submissions/abc');
	expect(response.status).toEqual(400);
});

test('delete /submissions/subid', () => {
	const response = request(app).delete('/submissions/456');
	expect(response.status).toEqual(404);
});
