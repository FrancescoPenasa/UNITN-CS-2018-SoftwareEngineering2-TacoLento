const request = require('supertest')
const path = '/submissions'
var app = require('../index');


//++++++++++++++++++++++++++++++++++++++++++++++++++++
//---------------------GET----------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++

//------------------------------------------------------
// GET /submissions/ with no empty submissions list must return 200 and the entire sub list
//------------------------------------------------------
test('get /submissions/', async () => {
	const response = await request(app).get('/submissions');
	expect (response.status).toEqual(200);
	expect (response.text).toContain([{id: 1, date: '23 novembre 2018', userId: 1, examId: 1, answer: [{idTask: 1, answer: 'test'}]}]);
});


//------------------------------------------------------
// GET /submissions/3 must return status and json 
//------------------------------------------------------
test('get /submissions/1', (done) => {
	request(app).post('/submissions').send({
			id : 3,
			date : "27/11/2018",
			userId : 1,
			examId : 2,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201).then(r =>
		{
			return request(app).get('/submissions/3'),then((response)  => 
					{
						expect(response.statusCode).toBe(302);
						expect (typeof response.body).toEqual('object');
					})
		})
	done();
});

//------------------------------------------------------
// GET /submissions/abc must return error  
//------------------------------------------------------
test('get /submissions/abc', (done) => {
	request(app).get('/submissions/abc').then((response) =>
	{
		expect (response.statusCode).toBe(400);
		done();
	});
});

//------------------------------------------------------
// GET /submissions/1.1 must return error  
//------------------------------------------------------
test('get /submissions/1.1', (done) => {
	request(app).get('/submissions/1.1').then((response) =>
	{
		expect (response.statusCode).toBe(400);
		done();
	});
});

//------------------------------------------------------
// GET /submissions/-1 must return error  
//------------------------------------------------------
test('get /submissions/-1', (done) => {
	request(app).get('/submissions/-1').then((response) =>
	{
		expect (response.statusCode).toBe(400);
		done();
	});
});

//------------------------------------------------------
// GET /submissions/5 must return not found
//------------------------------------------------------
test('get /submissions/5', (done) => {
	request(app).get('/submissions/5').then((response) =>
	{
		expect (response.statusCode).toBe(404);
	});
	done();
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------POST----------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++

//------------------------------------------------------
// POST /submissions/ must return 201 
//------------------------------------------------------
test('POST /submissions', (done) => {
	request(app).post('/submissions').send({
			id : 3,
			date : "27/11/2018",
			userId : 1,
			examId : 2,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201)
	done();
});

//------------------------------------------------------
// POST /submissions/ with data already exist must return conflict
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions').send({
			id : 1,
			date : "27/11/2018",
			userId : 1,
			examId : 1,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(409)
	done();
});

//------------------------------------------------------
// POST /submissions/ with wrong data input must return bad request 400
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions').send({
			id : 3,
			date : 27122018,
			userId : 1,
			examId : 2,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with wrong userId input must return bad request 400
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions').send({
			id : 3,
			date : "27/11/2018",
			userId : "abc",
			examId : 2,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with wrong examId input must return bad request 400 
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions').send({
			id : 3,
			date : "27/11/2018",
			userId : 1,
			examId : "abc",
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with wronge taskId must return bad request 400
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions').send({
			id : 3,
			date : "27/11/2018",
			userId : 1,
			examId : 2,
			answer: ["abc","test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with null id must return bad request 400
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions').send({
			id : null,
			date : "27/11/2018",
			userId : 1,
			examId : 2,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with null date must return bad request 400 
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions').send({
			id : 3,
			date : null,
			userId : 1,
			examId : 2,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with null userId must return bad request 400
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions').send({
			id : 3,
			date : "27/11/2018",
			userId : null,
			examId : 2,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with null examId must return bad request 400 
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions').send({
			id : 3,
			date : "27/11/2018",
			userId : 1,
			examId : null,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with null taskId must return bad request 400
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions').send({
			id : 3,
			date : "27/11/2018",
			userId : 1,
			examId : 2,
			answer: [null,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with id=-1 must return bad request 400
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions').send({
			id : -1,
			date : "27/11/2018",
			userId : 1,
			examId : 2,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with not integer id must return bad request 400
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions').send({
			id : 1.1,
			date : "27/11/2018",
			userId : 1,
			examId : 2,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with userid=-1 must return bad request 400
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions').send({
			id : 1,
			date : "27/11/2018",
			userId : -1,
			examId : 2,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with not integer userId must return bad request 400
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions').send({
			id : 1,
			date : "27/11/2018",
			userId : 1.1,
			examId : 2,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with examId=-2 must return bad request 400
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions').send({
			id : 1,
			date : "27/11/2018",
			userId : 1,
			examId : -2,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with not integer examid must return bad request 400
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions').send({
			id : 1,
			date : "27/11/2018",
			userId : 1,
			examId : 2.1,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with taskId=-1 must return bad request 400
//------------------------------------------------------
test('POST /submission/', (done) => {
	request(app).post('/submissions').send({
			id : 1,
			date : "27/11/2018",
			userId : 1,
			examId : 2,
			answer: [-1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with not integer taskId must return bad request 400
//------------------------------------------------------
test('POST /submission/', (done) => {
	request(app).post('/submissions').send({
			id : 1,
			date : "27/11/2018",
			userId : 1,
			examId : 2,
			answer: [1.1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//------------------------------------------------------
// POST /submissions/ with empty data must return bad request 400
//------------------------------------------------------
test('POST /submission/', (done) => {
	request(app).post('/submissions').send({
			id : 1,
			date : "",
			userId : 1,
			examId : 2,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++
//---------------------PUT----------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++

//------------------------------------------------------
// PUT /submissions/id with valid and exist id must return 202
//------------------------------------------------------
test('PUT /submisisons/id', (done) => 
{
	request(app).post('/submissions').send({
			id : 3,
			date : "28/11/2018",
			userId : 3,
			examId : 3,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201).then(r =>
			{
				return request(app).put('submissions/3').send({
							id : 3,
							date : "29/11/2018",
							userId : 3,
							examId : 3,
							answer: [1,"answer update"]
					 	}).set('Accept', 'application/json').expect(202)
			})
			done();
});

//------------------------------------------------------
// PUT /submissions/id with no exist id must return 404
//------------------------------------------------------
test('PUT /users/id', (done) => 
{
	request(app).put('submissions/1000').send({
			id : 1000,
			date : "29/11/2018",
			userId : 3,
			examId : 3,
			answer: [1,"answer update"]
		}).set('Accept', 'application/json').expect(404)
		done();
});

//------------------------------------------------------
// PUT /submissions/id with invalid data must return 400
//------------------------------------------------------
test('PUT /submissions/id', (done) => 
{
	request(app).post('/submissions').send({
			id : 3,
			date : "28/11/2018",
			userId : 3,
			examId : 3,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201).then(r =>
			{
				return request(app).put('submissions/3').send({
							id : 3,
							date : "",
							userId : 3,
							examId : 3,
							answer: [1,"answer update"]
					 	}).set('Accept', 'application/json').expect(400)
			})
			done();
});


//------------------------------------------------------
// PUT /submissions/id with invalid userId must return 400
//------------------------------------------------------
test('PUT /submissions/id', (done) => 
{
	request(app).post('/submissions').send({
			id : 3,
			date : "28/11/2018",
			userId : 3,
			examId : 3,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201).then(r =>
			{
				return request(app).put('submissions/3').send({
							id : 3,
							date : "28/11/2018",
							userId : "abc",
							examId : 3,
							answer: [1,"answer update"]
					 	}).set('Accept', 'application/json').expect(400)
			})
			done();
});

//------------------------------------------------------
// PUT /submissions/id with invalid examId must return 400
//------------------------------------------------------
test('PUT /submissions/id', (done) => 
{
	request(app).post('/submissions').send({
			id : 3,
			date : "28/11/2018",
			userId : 3,
			examId : 3,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201).then(r =>
			{
				return request(app).put('submissions/3').send({
							id : 3,
							date : "28/11/2018",
							userId : 3,
							examId : "abc",
							answer: [1,"answer update"]
					 	}).set('Accept', 'application/json').expect(400)
			})
			done();
});

//------------------------------------------------------
// PUT /submissions/id with invalid taskId must return 400
//------------------------------------------------------
test('PUT /submissions/id', (done) => 
{
	request(app).post('/submissions').send({
			id : 3,
			date : "28/11/2018",
			userId : 3,
			examId : 3,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201).then(r =>
			{
				return request(app).put('submissions/3').send({
							id : 3,
							date : "28/11/2018",
							userId : 3,
							examId : 3,
							answer: ["abc","answer update"]
					 	}).set('Accept', 'application/json').expect(400)
			})
			done();
});

//------------------------------------------------------
// PUT /submissions/id with not integer userId must return 400
//------------------------------------------------------
test('PUT /submissions/id', (done) => 
{
	request(app).post('/submissions').send({
			id : 3,
			date : "28/11/2018",
			userId : 3,
			examId : 3,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201).then(r =>
			{
				return request(app).put('submissions/3').send({
							id : 3,
							date : "28/11/2018",
							userId : 1.1,
							examId : 3,
							answer: [1,"answer update"]
					 	}).set('Accept', 'application/json').expect(400)
			})
			done();
});

//------------------------------------------------------
// PUT /submissions/id with not integer examId must return 400
//------------------------------------------------------
test('PUT /submissions/id', (done) => 
{
	request(app).post('/submissions').send({
			id : 3,
			date : "28/11/2018",
			userId : 3,
			examId : 3,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201).then(r =>
			{
				return request(app).put('submissions/3').send({
							id : 3,
							date : "28/11/2018",
							userId : 3,
							examId : 3.3,
							answer: [1,"answer update"]
					 	}).set('Accept', 'application/json').expect(400)
			})
			done();
});

//------------------------------------------------------
// PUT /submissions/id with not integer taskId must return 400
//------------------------------------------------------
test('PUT /submissions/id', (done) => 
{
	request(app).post('/submissions').send({
			id : 3,
			date : "28/11/2018",
			userId : 3,
			examId : 3,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201).then(r =>
			{
				return request(app).put('submissions/3').send({
							id : 3,
							date : "28/11/2018",
							userId : 3,
							examId : 3,
							answer: [1.1,"answer update"]
					 	}).set('Accept', 'application/json').expect(400)
			})
			done();
});

//------------------------------------------------------
// PUT /submissions/id with null userId must return 400
//------------------------------------------------------
test('PUT /submissions/id', (done) => 
{
	request(app).post('/submissions').send({
			id : 3,
			date : "28/11/2018",
			userId : 3,
			examId : 3,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201).then(r =>
			{
				return request(app).put('submissions/3').send({
							id : 3,
							date : "28/11/2018",
							userId : null,
							examId : 3,
							answer: [1,"answer update"]
					 	}).set('Accept', 'application/json').expect(400)
			})
			done();
});

//------------------------------------------------------
// PUT /submissions/id with null examId must return 400
//------------------------------------------------------
test('PUT /submissions/id', (done) => 
{
	request(app).post('/submissions').send({
			id : 3,
			date : "28/11/2018",
			userId : 3,
			examId : 3,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201).then(r =>
			{
				return request(app).put('submissions/3').send({
							id : 3,
							date : "28/11/2018",
							userId : 3,
							examId : null,
							answer: [1,"answer update"]
					 	}).set('Accept', 'application/json').expect(400)
			})
			done();
});

//------------------------------------------------------
// PUT /submissions/id with null taskId must return 400
//------------------------------------------------------
test('PUT /submissions/id', (done) => 
{
	request(app).post('/submissions').send({
			id : 3,
			date : "28/11/2018",
			userId : 3,
			examId : 3,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201).then(r =>
			{
				return request(app).put('submissions/3').send({
							id : 3,
							date : "28/11/2018",
							userId : 3,
							examId : 3,
							answer: [null,"answer update"]
					 	}).set('Accept', 'application/json').expect(400)
			})
			done();
});

//------------------------------------------------------
// PUT /submissions/id with userId=-3 must return 400
//------------------------------------------------------
test('PUT /submissions/id', (done) => 
{
	request(app).post('/submissions').send({
			id : 3,
			date : "28/11/2018",
			userId : 3,
			examId : 3,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201).then(r =>
			{
				return request(app).put('submissions/3').send({
							id : 3,
							date : "28/11/2018",
							userId : -3,
							examId : 3,
							answer: [1,"answer update"]
					 	}).set('Accept', 'application/json').expect(400)
			})
			done();
});

//------------------------------------------------------
// PUT /submissions/id with examId=-3 must return 400
//------------------------------------------------------
test('PUT /submissions/id', (done) => 
{
	request(app).post('/submissions').send({
			id : 3,
			date : "28/11/2018",
			userId : 3,
			examId : 3,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201).then(r =>
			{
				return request(app).put('submissions/3').send({
							id : 3,
							date : "28/11/2018",
							userId : 3,
							examId : -3,
							answer: [1,"answer update"]
					 	}).set('Accept', 'application/json').expect(400)
			})
			done();
});

//------------------------------------------------------
// PUT /submissions/id with taskId=-1 must return 400
//------------------------------------------------------
test('PUT /submissions/id', (done) => 
{
	request(app).post('/submissions').send({
			id : 3,
			date : "28/11/2018",
			userId : 3,
			examId : 3,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201).then(r =>
			{
				return request(app).put('submissions/3').send({
							id : 3,
							date : "28/11/2018",
							userId : 3,
							examId : 3,
							answer: [-1,"answer update"]
					 	}).set('Accept', 'application/json').expect(400)
			})
			done();
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------DELETE-------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++

//------------------------------------------------------
// DELETE /submissions/id with valid and exist id must return 200
//------------------------------------------------------
test('delete /submission/id', (done) => 
{
	request(app).post('/submissions').send({
			id : 3,
			date : "27/11/2018",
			userId : 1,
			examId : 2,
			answer: [1,"test"]
	}).set('Accept', 'application/json').expect(201).then(r =>
		{
			return request(app).delete('/submissions/3').expect(response.status).toEqual(202)
		})
	done();
});

//------------------------------------------------------
// DELETE /submissions/id with not exist id must return 404
//------------------------------------------------------
test('delete /submission/id', (done) => 
{
	request(app).delete('/submissions/1000').expect(404)
	done();
});

//------------------------------------------------------
// DELETE /submissions/id with invalid id must return 400
//------------------------------------------------------
test('delete /submission/id', (done) => 
{
	request(app).delete('/submissions/abc').expect(400)
	done();
});

//------------------------------------------------------
// DELETE /submissions/id with not integer id must return 400 
//------------------------------------------------------
test('delete /submission/id', (done) => 
{
	request(app).delete('/submissions/1.1').expect(400)
	done();
});

//------------------------------------------------------
// DELETE /submissions/id with negative id must return 400 
//------------------------------------------------------
test('delete /submission/id', (done) => 
{
	request(app).delete('/submissions/-1').expect(400)
	done();
});
