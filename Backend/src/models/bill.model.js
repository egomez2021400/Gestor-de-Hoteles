'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    reservation: {
        type: Schema.Types.ObjectId, 
        ref: 'Reservation',
    }, 
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
    },
    room: {
        type: Schema.Types.ObjectId, 
        ref: 'Room',
    },
    services: [{
        name: {
            type: String, 
            required: true,
        }, 
        price: {
            type: Number, 
            required: true,
        }, 
        quantity: {
            type: Number, 
            required: true,
        },
    }], 
    total: {
        type: Number,
        required: true,
    }, 
    paid: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('Bill', BillSchema);