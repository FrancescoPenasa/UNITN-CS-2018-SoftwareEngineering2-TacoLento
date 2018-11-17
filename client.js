var request = require('request');

/**
 * TEST FOR POST /USERS/  --> RESULTS ON GET /USERS/
 */
request.post(
    'http://localhost:3000/users',
    { json: {name: 'Pippo Franco', description: 'Pippo Franco', type: 'Pippo Franco' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);