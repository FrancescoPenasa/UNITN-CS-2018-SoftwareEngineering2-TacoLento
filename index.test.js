const request = require('supertest');
const url = 'http://localhost:3000/';
const path = '/'
//const url = 'https://tacolento-develop.herokuapp.com/'

var app = require('./index');

// beforeAll(function () {
//   app = require('./index');
// });
// afterAll(function () {
//   app.close();
// });

test('server module should be defined', () => {
    expect(app).toBeDefined();
});

test('GET / should return 200', (done) => {
  //expect.assertions(2);
	request(app).get(path).then((response) => {
    expect(response.statusCode).toBe(200);
    done();
  });
});
