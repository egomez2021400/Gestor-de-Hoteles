'use strict'

const { Router } = require('express');
const {validateJWT} = require('../middlewares/validate-jwt');
const { createHotel, readHotel, updateHotel, deleteHotel } = require('../controllers/hotel.controller');

const api = Router();

api.post('/create-hotel', createHotel);

api.get('/read-hotel', readHotel);

api.put('/update-hotel/:id', updateHotel);

api.delete('/delete-hotel/:id', deleteHotel);

module.exports = api;