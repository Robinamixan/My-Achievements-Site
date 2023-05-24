import mongoose from 'mongoose';
import {env} from 'node:process';

export function setConnection() {
    const MONGODB_URI = `mongodb://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}_test`;

    return mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
}

export function closeConnection () {
    return mongoose.disconnect();
}