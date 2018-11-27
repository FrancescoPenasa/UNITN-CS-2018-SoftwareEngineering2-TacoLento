const request = require('supertest');
const fetch = require("node-fetch");

const app = require('../app').app;
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
