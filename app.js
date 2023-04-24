const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./src/routes/user');
const healthCheckRouter = require('./src/routes/health-check');
const endpointNotFoundAction = require('./src/controllers/endpoint-not-found');
const corsHeadersMiddleware = require('./src/middleware/cors-headers');
const errorsProcessorMiddleware = require('./src/middleware/errors-processor');

// Constants
const INTERNAL_PORT = process.env.NODEJS_PORT;
const MONGODB_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

const app = express();

app.use(bodyParser.json());
app.use(corsHeadersMiddleware.handle);

app.use('/api/v1', userRouter);
app.use('/api/v1', healthCheckRouter);

app.use(endpointNotFoundAction);
app.use(errorsProcessorMiddleware.handle);

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI)
    .then(() => app.listen(INTERNAL_PORT))
    .catch(error => {
        console.log(error);

        return error;
    });