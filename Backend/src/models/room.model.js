'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    number: {
        type: Number, 
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
    type: {
        type: String, 
        enum: ['single', 'double', 'twin'], 
        required: true,
    }, 
    price: {
        type: Number, 
        required: true,
    }, 
    hotel: {
        type: Schema.Types.ObjectId, 
        ref: 'Hotel', 
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

module.exports = mongoose.model('Room', RoomSchema);