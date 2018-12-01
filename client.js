

/**
 * TEST FOR POST /USERS/  --> RESULTS ON GET /USERS/

request.post(
    'http://localhost:3000/users',
    { json: {name: 'Pippo Franco', description: 'Pippo Franco', type: 'Pippo Franco' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);
*/

request.post(
    'http://localhost:3000/exams',
    { json: {name: 'Analisi 1', date: '27/11/2018', deadline: '28/11/2018 19:00', questions_N: 5} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);
