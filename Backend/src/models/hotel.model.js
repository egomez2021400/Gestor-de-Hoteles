'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true,
    },
    address: {
        type: String, 
        required: true, 
    }, 
    rooms: [{
        type: Schema.Types.ObjectId, 
        ref: 'Room',
    }], 
    events: [{
        type: Schema.Types.ObjectId, 
        ref: 'Event',
    }],
    visits:{
        type: Number,
        default: 0
    },
    admin: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    }, 
    createdAt: {
        type: Date, 
        default: Date.now,
    },
})

module.exports = mongoose.model('Hotel', HotelSchema);