const submissionsId = require(' ./submissions/subid');

test('get /submissions/subid' , () => {
	const response = await request(server).get('/submissions/123');
	expect (response.status).toEqual(201);
	expect (response.text).toContain([{id: 123, date: '23 novembre 2018, userId: 321, examId: 1, answer: 
[idTask: 1, answer: 'test']}]);
}:

test('get /submissions/subid' , () => {
	const response = await request(server).get('/submissions/abc');
	expect(response.status).toEqual(400);
};

test('get /submission/subid' , () => {
	const response = await request(server).get('/submissions/456');
	expect(response.status).toEqual(404);
};

test('put /submission/subid' , () => {
	const response = await request(server).put('/submissions/123');
	expect(response.status).toEqual(201);
};

test('put /submission/subid' , () => {
	const response = await request(server).put('/submissions/abc');
	expect(response.status).toEqual(400);
};

test('put /submissions/subid' . () => {
	const response = await request(server).put('/submissions/456');
	expect(response.status).toEqual(404);
};

test('delete /submission/subid' , () => {
        const response = await request(server).delete('/submissions/123');
        expect(response.status).toEqual(201);
};

test('delete /submission/subid' , () => {
        const response = await request(server).delete('/submissions/abc');
        expect(response.status).toEqual(400);
};

test('delete /submissions/subid' . () => {
        const response = await request(server).delete('/submissions/456');
        expect(response.status).toEqual(404);
};

const submissions = require(' ./submissions');
