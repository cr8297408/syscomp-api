const config = require('../env/index');
const URL_SWAGGER = config.URL_SWAGGER;

const swaggerOptions = {
    definition: {
<<<<<<< HEAD
        openapi: '3.0.0',
        info: {
            title: 'Pos Api',
=======
        openapi: "3.0.0",
        info: {
            title: 'Central Pos',
>>>>>>> development
            version: '1.0.0',
        },
        servers: [
            {
		    url: URL_SWAGGER,
                description: "server test",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    in: 'header'
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerOptions;