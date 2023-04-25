const mongoose = require('mongoose');
const {env} = require('node:process');

module.exports.setConnection = () => {
    const MONGODB_URI = `mongodb://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}_test`;

    return mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
};

module.exports.closeConnection = () => {
    return mongoose.disconnect();
};