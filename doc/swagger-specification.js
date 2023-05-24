import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'My Achievements API Swagger doc',
            version: '1.0.0',
            description:
                'Swagger documentation about My Achievements API',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
        },
        servers: [
            {
                url: '/api/v1',
            },
        ],
        components: {
            securitySchemes: {
                Authorization: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            Authorization: []
        }]
    },
    apis: [
        './src/routes/**/*.js'
    ],
};

export default swaggerJsdoc(options);