'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    rol: {
        type: String,
        enum: ['ADMINHOTEL', 'CLIENT'],
        require: true,
    },
    bill: [
        {
          nombre: {type: Schema.Types.ObjectId, ref: 'Hotel'},  
          habitaciones: {type: Number},
          fecha: {type: Date, default: Date.now}
        }
    ]
});

module.exports = mongoose.model('Users', userSchema);