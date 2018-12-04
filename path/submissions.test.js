const request = require('supertest')
const path = '/submissions'
var app = require('../index');


//++++++++++++++++++++++++++++++++++++++++++++++++++++
//---------------------GET----------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++

//------------------------------------------------------
// GET /submissions/ with no empty submissions list must return 200 and the entire sub list
//------------------------------------------------------
test('get /submissions/', () => {
	const response = await request(app).get('/submissions/');
	expect (response.status).toEqual(200);
	expect (response.text).toContain([{id: 1, date: '23 novembre 2018', userId: 1, examId: 1, answer: [{idTask: 1, answer: 'test'}]}]);
});


//------------------------------------------------------
// GET /submissions/1 must return status and json 
//------------------------------------------------------
test('get /submissions/1', async () => {
	const response = await request(app).get('/submissions/1');
	expect (response.status).toEqual(200);
	expect (response.text).toEqual([{id: 1, date: '23 novembre 2018', userId: 1, examId: 1, answer: [{idTask: 1, answer: 'test'}]}]);
});

//------------------------------------------------------
// GET /submissions/abc must return error  
//------------------------------------------------------
test('get /submissions/abc', async () => {
	request(app).get('/submissions/abc').then((response) =>
	{
		expect (response.statusCode).toBe(400);
		done();
	});
});

//------------------------------------------------------
// GET /submissions/1.1 must return error  
//------------------------------------------------------
test('get /submissions/1.1', async () => {
	request(app).get('/submissions/1.1').then((response) =>
	{
		expect (response.statusCode).toBe(400);
		done();
	});
});

//------------------------------------------------------
// GET /submissions/-1 must return error  
//------------------------------------------------------
test('get /submissions/-1', async () => {
	request(app).get('/submissions/-1').then((response) =>
	{
		expect (response.statusCode).toBe(400);
		done();
	});
});

//------------------------------------------------------
// GET /submissions/5 must return not found
//------------------------------------------------------
test('get /submissions/5', async () => {
	request(app).get('/submissions/1000').then((response) =>
	{
		expect (response.statusCode).toBe(404);
		done();
	});
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------POST----------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++

//------------------------------------------------------
// POST /submissions/ must return 201 
//------------------------------------------------------
test('POST /submissions/', (done) => {
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
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
	request(app).post('/submissions/').send({
			id : 1,
			date : "",
			userId : 1,
			examId : 2,
			answer: [1.1,"test"]
	}).set('Accept', 'application/json').expect(400)
	done();
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++
//---------------------PUT----------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++



//++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------DELETE-------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++






/**
//------------------------------------------------------
// GET /submissions/ with no empty submissions list must return 200 and the entire sub list
//------------------------------------------------------
test('put /submissions/subid', () => {
	const response = request(app).put('/submissions/456');
	expect(response.status).toEqual(404);
});


//------------------------------------------------------
// GET /submissions/ with no empty submissions list must return 200 and the entire sub list
//------------------------------------------------------
test('delete /submission/subid', () => {
	const response = request(app).delete('/submissions/1');
	expect(response.status).toEqual(201);
});


//------------------------------------------------------
// GET /submissions/ with no empty submissions list must return 200 and the entire sub list
//------------------------------------------------------
test('delete /submission/subid', () => {
	const response = request(app).delete('/submissions/abc');
	expect(response.status).toEqual(400);
});


//------------------------------------------------------
// GET /submissions/ with no empty submissions list must return 200 and the entire sub list
//------------------------------------------------------
test('delete /submissions/subid', () => {
	const response = request(app).delete('/submissions/456');
	expect(response.status).toEqual(404);
});**/