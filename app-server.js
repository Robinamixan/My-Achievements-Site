import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import swaggerSpecification from './doc/swagger-specification.js';
import userRouter from './src/routes/user-routes.js';
import healthCheckRouter from './src/routes/health-check.js';
import endpointNotFoundMiddleware from './src/middlewares/endpoint-not-found.js';
import corsHeadersMiddleware from './src/middlewares/cors-headers.js';
import errorsProcessorMiddleware from './src/middlewares/errors-processor.js';

export function init() {
    const app = express();

    app.use(bodyParser.json());
    app.use(corsHeadersMiddleware);

    app.use('/api/v1', userRouter);
    app.use('/api/v1', healthCheckRouter);

    app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpecification));
    app.use(endpointNotFoundMiddleware);
    app.use(errorsProcessorMiddleware);

    return app;
}