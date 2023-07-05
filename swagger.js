const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Food recipe API',
        description: 'API for the recipe web application by Oleksandr Avramenko',
    },
    host: 'cse341-project2-sqhr.onrender.com',
    schemes: ['https'],
    // host: 'localhost:8080',
    // schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

// generate swagger.json file
swaggerAutogen(outputFile, endpointsFile, doc);