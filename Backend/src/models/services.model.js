'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: {
        type: String, 
        required: true, 
    },
    description: {
        type: String, 
        required: true,
    },
    price: {
        type: Number, 
        required: true,
    }, 
    hotel: {
        type: Schema.Types.ObjectId, 
        ref: 'Hotel',
    }
});

module.exports = mongoose.model('Service', ServiceSchema)