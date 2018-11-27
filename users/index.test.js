const request = require('supertest');
const fetch = require("node-fetch");

const app = require('./app').app;
const url = "http://localhost:3000/users"
//const url = 'https://tacolento-develop.herokuapp.com/'


/** APP.test.js */
test('app module should be defined', () => {
    expect(app).toBeDefined();
  });

test('GET / should return 200', async () => {
   const response = await request(app).get('/');
   expect(response.statusCode).toBe(200);
 });


 /** USERS.test.js  */
 /** GET /users */
 test('GET /users/ if empty should return 404 ', async () => {
	const response = await request(app).get('/users/');
  expect (response.status).toBe(404);
  expect (response.text).toBe("No users found");
});


// test('GET /users/ if not empty should return 200 and the list of users',  () => {
//   return fetch(url, {
//     method: 'POST',
//     body: JSON.stringify({
//       "name": 'Test', 
//       "surname": "Test", 
//       "email" : "Test@email.com", 
//       "password" : "password"}),
//     headers: {
//     'Content-Type': 'application/json',}
//   })
//   .then(r => expect(r.status).toEqual(201))
//   .then(r => r = request(app).get(url))
//   .then(r => expect(r.status).toEqual(200))
//   });


/** POST /users/ */
test('POST /users/ should return 201', () => {
  return fetch(url, {
    method: 'POST',
        body: JSON.stringify({
          "name": 'Nome', 
          "surname": "Cognome", 
          "email" : "email@email.com", 
          "password" : "password"}),
        headers: {
        'Content-Type': 'application/json',
        },      
      })
      .then(r => expect(r.status).toEqual(201));
});

test('POST /users/ should return 400', () => {
  return fetch(url, {
    method: 'POST',
        body: JSON.stringify({
          "name":"",
          "surname": "", 
          "email" : "email@email.com", 
          "password" : "1"}),
        headers: {
        'Content-Type': 'application/json',
        },      
      })
      .then(r => expect(r.status).toEqual(400))
});


test('POST /users/ should return 409', () => {
  fetch(url, {
    method: 'POST',
        body: JSON.stringify({
          "name": 'Nome', 
          "surname": "Cognome", 
          "email" : "email@email.com", 
          "password" : "password"}),
        headers: {
        'Content-Type': 'application/json',
        },      
      }).then(r => expect(r.status).toEqual(201))
      

    fetch(url,{
      method: 'POST',
          body: JSON.stringify({
            "name": 'Pippo', 
            "surname": "Topolino", 
            "email" : "email@email.com", 
            "password" : "paperino"}),
          headers: {
          'Content-Type': 'application/json',
          },      
        })

      .then(r => expect(r.text).toEqual("email already exists"))
      .then(r => expect(r.status).toEqual(409));
});
