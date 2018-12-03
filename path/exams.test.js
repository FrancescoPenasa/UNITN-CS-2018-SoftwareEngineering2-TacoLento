const request = require('supertest')
const path = '/exams'

var app = require('../index');

//GET EXAMS
test('GET /exams status+json check', async () => {
	const response = await request(app).get('/exams');
	expect(response.status).toEqual(200);
	expect(response.text).toEqual("[{\"id\":0,\"name\":\"esame se2\",\"date\":\"27/11/2018\",\"deadline\":\"28/11/2018 18:30\",\"questions_N\":10,\"tasks\":[1,2,3,4,5,6,7,8,9,10]},{\"id\":1,\"name\":\"esame web\",\"date\":\"30/11/2018\",\"deadline\":\"25/12/2018 18:30\",\"questions_N\":2,\"tasks\":[12,13]}]");
});

test('GET /exams/0 status+json check', async () => {
	const response = await request(app).get('/exams/0');
	expect(response.status).toEqual(200);
	expect(response.text).toEqual("{\"id\":0,\"name\":\"esame se2\",\"date\":\"27/11/2018\",\"deadline\":\"28/11/2018 18:30\",\"questions_N\":10,\"tasks\":[1,2,3,4,5,6,7,8,9,10]}");
});

test('GET /exams/:id if id isNaN should return 400 ', (done) => {
	request(app).get(path+'/abc').then((response) => {
    expect(response.statusCode).toBe(400);
    done();
  });
});

test('GET /exams/:id if id is float should return 400 ', (done) => {
	request(app).get(path+'/13.5').then((response) => {
    expect(response.statusCode).toBe(400);
    done();
  });
});

//POST EXAMS
test('POST /exams/ status check', (done) => {
	request(app)
	.post(path)
	.send({
  		name: 'Esame Database',
  		date: '25/12/2018',
		deadline: '31/12/2018 18:30',
		questions_N: 3,
		tasks: [6,3,2]
	})
  .set('Accept', 'application/json')
  .expect(201)
	done();
});

test('POST /exams/ with a number as name should return 400', (done) => {
	request(app)
	.post(path)
	.send({
  		name: 42,
  		date: '25/12/2018',
		deadline: '31/12/2018 18:30',
		questions_N: 3,
		tasks: [6,3,2]
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});

test('POST /exams/ with a number as date should return 400', (done) => {
	request(app)
	.post(path)
	.send({
  		name: "Esame Database",
  		date: 42,
		deadline: '31/12/2018 18:30',
		questions_N: 3,
		tasks: [6,3,2]
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});

test('POST /exams/ with a number as deadline should return 400', (done) => {
	request(app)
	.post(path)
	.send({
  		name: "Esame Database",
  		date: '25/12/2018',
		deadline: 42,
		questions_N: 3,
		tasks: [6,3,2]
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});

test('POST /exams/ with a string as questions_N should return 400', (done) => {
	request(app)
	.post(path)
	.send({
  		name: "Esame Database",
  		date: '25/12/2018',
		deadline: 42,
		questions_N: "33",
		tasks: [6,3,2]
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});

test('POST /exams/ with a string as tasks should return 400', (done) => {
	request(app)
	.post(path)
	.send({
  		name: "Esame Database",
  		date: '25/12/2018',
		deadline: 42,
		questions_N: 3,
		tasks: "abc"
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});

test('POST /exams/ with a null name should return 400', (done) => {
	request(app)
	.post(path)
	.send({
  		name: null,
  		date: '25/12/2018',
		deadline: '31/12/2018 18:30',
		questions_N: 3,
		tasks: [6,3,2]
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});

test('POST /exams/ with a null date should return 400', (done) => {
	request(app)
	.post(path)
	.send({
  		name: "Esame Database",
  		date: null,
		deadline: '31/12/2018 18:30',
		questions_N: 3,
		tasks: [6,3,2]
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});

test('POST /exams/ with a null deadline should return 400', (done) => {
	request(app)
	.post(path)
	.send({
  		name: "Esame Database",
  		date: '25/12/2018',
		deadline: null,
		questions_N: 3,
		tasks: [6,3,2]
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});

test('POST /exams/ with a null questions_N should return 400', (done) => {
	request(app)
	.post(path)
	.send({
  		name: "Esame Database",
  		date: '25/12/2018',
		deadline: '31/12/2018 18:30',
		questions_N: null,
		tasks: [6,3,2]
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});

test('POST /exams/ with a null questions_N should return 400', (done) => {
	request(app)
	.post(path)
	.send({
  		name: "Esame Database",
  		date: '25/12/2018',
		deadline: '31/12/2018 18:30',
		questions_N: 3,
		tasks: null
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});

test('POST /exams/ with an empty name should return 400', (done) => {
	request(app)
	.post(path)
	.send({
  		name: "",
  		date: '25/12/2018',
		deadline: '31/12/2018 18:30',
		questions_N: 3,
		tasks: [6,3,2]
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});

test('POST /exams/ with an empty date should return 400', (done) => {
	request(app)
	.post(path)
	.send({
  		name: "Esame Database",
  		date: "",
		deadline: '31/12/2018 18:30',
		questions_N: 3,
		tasks: [6,3,2]
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});

test('POST /exams/ with an empty deadline should return 400', (done) => {
	request(app)
	.post(path)
	.send({
  		name: "Esame Database",
  		date: '25/12/2018',
		deadline: "",
		questions_N: 3,
		tasks: [6,3,2]
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});

test('POST /exams/ with 0 questions_N should return 400', (done) => {
	request(app)
	.post(path)
	.send({
  		name: "Esame Database",
  		date: '25/12/2018',
		deadline: '31/12/2018 18:30',
		questions_N: 0,
		tasks: [6,3,2]
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});

test('POST /exams/ with a negative questions_N should return 400', (done) => {
	request(app)
	.post(path)
	.send({
  		name: "Esame Database",
  		date: '25/12/2018',
		deadline: '31/12/2018 18:30',
		questions_N: -5,
		tasks: [6,3,2]
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});

test('POST /exams/ with empty tasks should return 400', (done) => {
	request(app)
	.post(path)
	.send({
  		name: "Esame Database",
  		date: '25/12/2018',
		deadline: '31/12/2018 18:30',
		questions_N: 3,
		tasks: []
	})
  .set('Accept', 'application/json')
  .expect(400)
	done();
});

//PUT EXAMS
test('PUT /exams/:id if exam exists and input is valid should return 202', (done) => {request(app)
	.post(path)
	.send({
		name: "Esame Prova",
		date: '25/12/2048',
		deadline: '31/12/2055 01:11',
		questions_N: 3,
		tasks: [1,6,3]
	})
  .set('Accept', 'application/json')
  .expect(201)
	.then(r => {
				return request(app)
				.put(path+'/2')
				.send({
					name: "Esame Prova2",
					date: '66/66/6666',
					deadline: '77/77/7777 77:77',
					questions_N: 77,
					tasks: [7,77,777]
				})
				.set('Accept', 'application/json')
				.expect(202)
	})
  done();
});

test('PUT /exams/:id if exam exists and input is not valid should return 400', (done) => {request(app)
	.post(path)
	.send({
		name: "Esame Prova",
		date: '25/12/2048',
		deadline: '31/12/2055 01:11',
		questions_N: 3,
		tasks: [1,6,3]
	})
  .set('Accept', 'application/json')
  .expect(201)
	.then(r => {
             return request(app)
						 .put(path+'/2')
						 .send({
							name: 123,
							date: null,
							deadline: '31/12/2055 01:11',
							questions_N: -3,
							tasks: [1,6,3]
					 	})
						 .set('Accept', 'application/json')
					   .expect(400)
	})
  done();
});

test("PUT /exams/:id if doesn't exist should return 404", (done) => {
	request(app)
	.put(path+'/999')
	.send({
		name: "aoe",
		date: "54/3/210",
		deadline: '31/12/2055 01:11',
		questions_N: 3,
		tasks: [1,6,3]
 })
	.set('Accept', 'application/json')
	.expect(404)
  done();
});

//DELETE EXAMS
test("DELETE /exams/:id if id exists should return 200", async () => {
	const response = await request(app).delete('/exams/1');
	expect(response.status).toEqual(200);
});

test("DELETE /exams/:id if doesn't exist should return 404", (done) => {
	request(app)
	.delete(path+'/999')
	.expect(404)
  done();
});

test("DELETE /exams/:id if id is NaN should return 404", (done) => {
	request(app)
	.delete(path+'/abc')
	.expect(404)
  done();
});

test("DELETE /exams/:id if id is float should return 404", (done) => {
	request(app)
	.delete(path+'/12.345')
	.expect(404)
  done();
});