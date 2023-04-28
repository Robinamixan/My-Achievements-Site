import mongoose from 'mongoose';

import {ROLE_USER} from '../enums/user-roles.js';

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        roles: {
            type: Array,
            default: [ROLE_USER]
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', userSchema);