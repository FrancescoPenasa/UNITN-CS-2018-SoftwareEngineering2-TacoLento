const request = require('supertest');
const path = '/exams';

var app = require('../index');

//GET EXAMS
test('GET /exams should return 200 and a JSON Object', (done) => {
	request(app).get(path).then((response) => {
		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(typeof response.body).toEqual('object');
		expect(response.text).toEqual("[{\"id\":0,\"name\":\"esame se2\",\"date\":\"27/11/2018\",\"deadline\":\"28/11/2018 18:30\",\"tasks\":[1,2,3,4,5,6,7,8,9,10]},{\"id\":1,\"name\":\"esame web\",\"date\":\"30/11/2018\",\"deadline\":\"25/12/2018 18:30\",\"tasks\":[12,13]}]");

    done();
  });
});

test('GET /exams/0 should return 200 and a JSON Object', (done) => {
	request(app).get(path+'/0').then((response) => {
		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
		expect(typeof response.body).toEqual('object');
		expect(response.text).toEqual("{\"id\":0,\"name\":\"esame se2\",\"date\":\"27/11/2018\",\"deadline\":\"28/11/2018 18:30\",\"tasks\":[1,2,3,4,5,6,7,8,9,10]}");

    done();
  });
});

test('GET /exams/:id if id isNaN should return 400', (done) => {
	request(app).get(path+'/abc').then((response) => {
		expect(response.statusCode).toBe(400);
		
    done();
  });
});

test('GET /exams/:id if id is float should return 400', (done) => {
	request(app).get(path+'/13.5').then((response) => {
		expect(response.statusCode).toBe(400);
		
    done();
  });
});

test('GET /exams/:id with id greater than db size should return 404', (done) => {
	request(app).get(path+'/999').then((response) => {
		expect(response.statusCode).toBe(404);
		
    done();
  });
});

//POST EXAMS
test('POST /exams/ should return 201', (done) => {
	request(app)
	.post(path)
	.send({
		name: 'Esame Database',
		date: '25/12/2018',
		deadline: '31/12/2018 18:30',
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
		name: 'Esame Database',
		date: 42,
		deadline: '31/12/2018 18:30',
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
		name: 'Esame Database',
		date: '25/12/2018',
		deadline: 42,
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
		name: 'Esame Database',
		date: '25/12/2018',
		deadline: 42,
		tasks: 'abc'
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
		name: 'Esame Database',
		date: null,
		deadline: '31/12/2018 18:30',
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
		name: 'Esame Database',
		date: '25/12/2018',
		deadline: null,
		tasks: [6,3,2]
	})
  .set('Accept', 'application/json')
	.expect(400)
	
	done();
});

test('POST /exams/ with null tasks should return 400', (done) => {
	request(app)
	.post(path)
	.send({
		name: 'Esame Database',
		date: '25/12/2018',
		deadline: '31/12/2018 18:30',
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
		name: '',
		date: '25/12/2018',
		deadline: '31/12/2018 18:30',
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
		name: 'Esame Database',
		date: '',
		deadline: '31/12/2018 18:30',
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
		name: 'Esame Database',
		date: '25/12/2018',
		deadline: '',
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
		name: 'Esame Database',
		date: '25/12/2018',
		deadline: '31/12/2018 18:30',
		tasks: []
	})
  .set('Accept', 'application/json')
	.expect(400)
	
	done();
});

//PUT EXAMS
test('PUT /exams/:id should return 202', (done) => {
	request(app)
	.put(path+'/1')
	.send({
		name: 'Esame Prova2',
		date: '66/66/6666',
		deadline: '77/77/7777 77:77',
		tasks: [7,77,777]
	})
	.set('Accept', 'application/json')
	.expect(202)

  done();
});

test('PUT /exams/:id if exam exists and input is not valid should return 400', (done) => {
	request(app)
	.put(path+'/1')
	.send({
		name: null,
		date: [1,2,3],
		deadline: '77/77/7777 77:77',
		tasks: 'aa'
	})
	.set('Accept', 'application/json')
	.expect(202)

  done();
});

test('PUT /exams/:id if exam doesn\'t exist should return 404', (done) => {
	request(app)
	.put(path+'/999')
	.send({
		name: 'aoe',
		date: '54/3/210',
		deadline: '31/12/2055 01:11',
		tasks: [1,6,3]
 })
	.set('Accept', 'application/json')
	.expect(404)

  done();
});

//DELETE EXAMS
test('DELETE /exams/:id if exam exists should return 200', (done) => {
	request(app)
	.delete(path+'/1')
	.expect(200)

  done();
});

test('DELETE /exams/:id if exam doesn\'t exist should return 404', (done) => {
	request(app)
	.delete(path+'/999')
	.expect(404)

  done();
});

test('DELETE /exams/:id if id is NaN should return 404', (done) => {
	request(app)
	.delete(path+'/abc')
	.expect(404)

  done();
});

test('DELETE /exams/:id if id is float should return 404', (done) => {
	request(app)
	.delete(path+'/12.345')
	.expect(404)

  done();
});

// MISC
test('DELETE /exams/:id and then GET should return 410', (done) => {
	request(app)
	.delete(path+'/1')
	.expect(200)
	.then(r => {
		return request(app)
			.get(path+'/999')
			.expect(410)
	})

  done();
});

test('DELETE /exams/:id and then PUT should return 410', (done) => {
	request(app)
	.delete(path+'/1')
	.expect(200)
	.then(r => {
		return request(app)
		.put(path+'/1')
		.send({
			name: 'Esame Cancellato',
			date: '31/12/2020',
			deadline: '01/01/2021 01:11',
			tasks: [1,6]
		})
		.set('Accept', 'application/json')
		.expect(410)
	})

  done();
});