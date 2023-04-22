'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bedroomsSchema = Schema({
    roomNumber: Number,
    typeRoom: String,
    price: Number,
    availability: Date,
    available: Boolean,
    hotel: {
        type: Schema.Types.ObjectId, ref: 'Hotel'
    }
})

module.exports = mongoose.model('Bedrooms', bedroomsSchema);