'use strict'

const {Router} = require('express');
const {check} = require('express-validator');
const { createHotel, readHotels, editHotel, deleteHotel , mostVisitedHotels, getHotelById} = require('../controller/hotel.controller');
const {validateParams} = require('../middlewares/validate-params');
const { adminRol } = require('../middlewares/validate-rol');
const { validateJWT } = require('../middlewares/validate-jwt');

const api = Router();

api.post('/create-hotel',[
    validateJWT,
    adminRol,
    check('name', 'El parametro name es necesario para la creacion de un hotel').not().isEmpty(),
    check('description', 'El parametro description es necesario para la creacion de un hotel').not().isEmpty(),
    check('address', 'El parametro address es necesario para la creacion de un hotel').not().isEmpty(),
    check('admin', 'El parametro admin es necesario para la creacion de un hotel').not().isEmpty(),
    validateParams

], createHotel);

api.get('/read-hotels', readHotels);

api.get('/get-hotel/:hotelId', getHotelById)

//Ver los 10 hoteles mas visitados
api.get('/hotels-most-visited', [
    //validateJWT,
    //adminRol
], mostVisitedHotels)

api.put('/edit-hotel/:id', [
    validateJWT,
    check('name', 'El parametro name es necesario para la creacion de un hotel').not().isEmpty(),
    check('description', 'El parametro description es necesario para la creacion de un hotel').not().isEmpty(),
    check('address', 'El parametro address es necesario para la creacion de un hotel').not().isEmpty(),
    check('admin', 'El parametro admin es necesario para la creacion de un hotel').not().isEmpty(),
    validateParams
], editHotel);

api.delete('/delete-hotel/:id',[
    validateJWT,
    adminRol
], deleteHotel);

module.exports = api;