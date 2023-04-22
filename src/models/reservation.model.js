'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationSchema = Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'Users'
    },
    bedrooms: {
        type: Schema.Types.ObjectId, ref: 'Bedrooms'
    },    
    servicios: [{
        type: Schema.Types.ObjectId, ref: 'Servicios'
        }
    ],
    price: Number,
    Hotel: {
        type: Schema.Types.ObjectId, ref: 'Hotel'
    }
})  

module.exports = mongoose.model('Reservation', ReservationSchema);