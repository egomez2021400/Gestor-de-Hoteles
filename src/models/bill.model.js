'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'Users'
    },
    reservation: [
        {
            bedrooms: {
                type: Schema.Types.ObjectId, ref: 'Bedrooms',
                require: true
            },
            price: {
                type: Number,
                require: true
            },
            servicios: {
                type: Schema.Types.ObjectId, ref: 'Servicios',
                require: true
            },
        }
    ],
    total: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Bills', BillSchema);