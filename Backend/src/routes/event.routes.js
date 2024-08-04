'use strict'


const {Router} = require('express');
const {check} = require('express-validator');
const {validateParams} = require('../middlewares/validate-params');

const { createEvent,readEventsForHotel ,updateEvent,deleteEvent, readEvents} = require('../controller/event.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const api = Router();

api.post('/create-event',[
    validateJWT,
    check('name', 'El name es un parametro necesario para crear el evento').not().isEmpty(),
    check('description', 'El description es un parametro necesario para crear el evento').not().isEmpty(),
    check('type', 'El type es un parametro necesario para crear el evento').not().isEmpty(),
    check('date', 'El date es un parametro necesario para crear el evento').not().isEmpty(),
    check('hotel', 'El hotel es un parametro necesario para crear el evento').not().isEmpty(),
    validateParams
], createEvent);

//Mostrar eventos por hotel
api.get('/read-events-for-hotel',[
    check('id','El id es un parametro obligatorio para el uso de la funcion.').not().isEmpty(),
    validateParams
],readEventsForHotel);

api.get('/read-events', readEvents);

api.put('/update-event',[
    validateJWT,
    check('id', 'El id es un parametro necesario para editar el evento').not().isEmpty(),
    check('name', 'El name es un parametro necesario para editar el evento').not().isEmpty(),
    check('description', 'El description es un parametro necesario para editar el evento').not().isEmpty(),
    check('type', 'El type es un parametro necesario para editar el evento').not().isEmpty(),
    check('date', 'El date es un parametro necesario para editar el evento').not().isEmpty(),
    check('hotel', 'El hotel es un parametro necesario para editar el evento').not().isEmpty(),
    validateParams
],updateEvent);

api.delete('/delete-event',[
    validateJWT,
    check('id', 'El id es un parametro necesario para eliminar el evento').not().isEmpty(),
    validateParams
],deleteEvent);

module.exports = api;