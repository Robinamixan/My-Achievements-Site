const mongoose = require('mongoose');

const appServer = require('./app-server');

// Constants
const INTERNAL_PORT = process.env.NODEJS_PORT;
const MONGODB_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

(() => {
    const app = appServer.init();

    mongoose.set('strictQuery', false);
    mongoose.connect(MONGODB_URI)
        .then(() => app.listen(INTERNAL_PORT))
        .catch(error => {
            console.log(error);

            return error;
        });
})();
