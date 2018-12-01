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




const fetch = require("node-fetch");

const url = "http://localhost:3000/tasks"
//const url = 'https://tacolento-develop.herokuapp.com/'

 // TASKS.test.js

 ///// GET /users /////
test('GET /tasks/ if empty should return 404 ', async () => {
 const response = await request(app).get('/tasks/');
  expect (response.status).toBe(404);
  expect (response.text).toBe("No tasks found");
});


test('POST /tasks/ should return 201', () => {
  return fetch(url, {
    method: 'POST',
        body: JSON.stringify({
          "taskType": "MC",
          "question": "ABC?",
          "subject" : "Math"}),
        headers: {
        'Content-Type': 'application/json',
        },
      })
      .then(r => expect(r.status).toEqual(201));
});

test('POST /tasks/ should return 400 because task is wrong', () => {
  return fetch(url, {
    method: 'POST',
        body: JSON.stringify({
          "taskType": "aa",
          "question": "ABC?",
          "subject" : "Math"}),
        headers: {
        'Content-Type': 'application/json',
        },
      })
      .then(r => expect(r.status).toEqual(400))
});

test('POST /tasks/ should return 400 becuse question is empty', () => {
  return fetch(url, {
    method: 'POST',
        body: JSON.stringify({
          "taskType": "OP",
          "question": "",
          "subject" : "Math"}),
        headers: {
        'Content-Type': 'application/json',
        },
      })
      .then(r => expect(r.status).toEqual(400))
});

test('POST /tasks/ should return 400 because subject is empty', () => {
  return fetch(url, {
    method: 'POST',
        body: JSON.stringify({
          "taskType": "OP",
          "question": "ABC?",
          "subject" : ""}),
        headers: {
        'Content-Type': 'application/json',
        },
      })
      .then(r => expect(r.status).toEqual(400))
});
