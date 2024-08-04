'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
        type: String, 
        required: true,
    }, 
    description: {
        type: String, 
        required: true,
    },
    type: {
        type: String, 
        required: true,
    },
    date: {
        type: Date, 
        required: true,
    },
    hotel: {
        type: Schema.Types.ObjectId, 
        ref: 'Hotel',
        required: true,
    },
})

module.exports = mongoose.model('Event', EventSchema);