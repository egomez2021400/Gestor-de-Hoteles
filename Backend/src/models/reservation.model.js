'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
    room: {
        type: Schema.Types.ObjectId, 
        ref: 'Room', 
        required: true,
    }, 
    checkIn: {
        type: Date, 
        required: true,
    }, 
    checkOut: {
        type: Date, 
        required: true,
    },
    services: [{
        service: {
            type: Schema.Types.ObjectId,
            ref: 'Service',
            required: true
        },
        quantity: { 
            type: Number, default : 1 
        }
    }], 
    totalPrice: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
})

module.exports = mongoose.model('Reservation', ReservationSchema);