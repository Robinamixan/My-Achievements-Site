const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const swaggerSettings = require('./doc/swagger-settings');
const userRouter = require('./src/routes/user-routes');
const healthCheckRouter = require('./src/routes/health-check');
const endpointNotFoundAction = require('./src/controllers/endpoint-not-found');
const corsHeadersMiddleware = require('./src/middlewares/cors-headers');
const errorsProcessorMiddleware = require('./src/middlewares/errors-processor');

module.exports.init = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(corsHeadersMiddleware.handle);

    app.use('/api/v1', userRouter);
    app.use('/api/v1', healthCheckRouter);

    app.use(endpointNotFoundAction);
    app.use(errorsProcessorMiddleware.handle);

    return app;
};