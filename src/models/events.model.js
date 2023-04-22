'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = Schema({
    event: String,
    eventType: String,
    hotel: {
        type: Schema.Types.ObjectId, ref: 'Hotel'
    },
    date: Date
})

module.exports = mongoose.model('Events', EventSchema);