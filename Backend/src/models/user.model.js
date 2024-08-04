'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String, 
        required: true,
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true, 
    }, 
    password: {
        type: String, 
        required: true,
    }, 
    rol: {
        type: String, 
        enum: ['USER', 'ADMIN', 'MANAGER'],
        default: 'USER',
    }, 
    hotel: {
        type: Schema.Types.ObjectId, 
        ref: 'Hotel'
    },
    reservations: [{
        type: Schema.Types.ObjectId, 
        ref: 'Reservation',
    }],
});

module.exports = mongoose.model('User', UserSchema);