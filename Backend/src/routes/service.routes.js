'use strict'
const {Router} = require('express');
const {validateJWT} = require('../middlewares/validate-jwt');
const {validateParams} = require('../middlewares/validate-params')
const {check} = require('express-validator');

const { createService, readServicesByHotel ,updateServices, deleteService,addServiceToReservation } = require('../controller/services.controller');

const api = Router();

api.post('/create-service',[
    validateJWT,
    check('name', 'El parametro name es necesario para la creacion de un servicio.').not().isEmpty(),
    check('description', 'El parametro description es necesario para la creacion de un servicio.').not().isEmpty(),
    check('price', 'El parametro price es necesario para la creacion de un servicio.').not().isEmpty(),
    check('hotel', 'El parametro hotel es necesario para la creacion de un servicio.').not().isEmpty(),
    validateParams
], createService);

//Buscar servicios por hotel
api.get('/read-services', [
    check('idHotel', 'El id del hotel es necesario para leer sus servicios.').not().isEmpty(),
    validateParams,
],readServicesByHotel )

api.put('/update-service', [
    validateJWT,
    check('idService', 'El idService es un parametro obligatorio para actualizar el servicio.').not().isEmpty(),
    check('name', 'El name es un parametro obligatorio para actualizar el servicio.').not().isEmpty(),
    check('hotel', 'El hotel es un parametro obligatorio para actualizar el servicio.').not().isEmpty(),
    validateParams
], updateServices);

api.delete( '/delete-service',[
    validateJWT,
    check('idService', 'El idService es un parametro obligatorio para eliminar el servicio.').not().isEmpty(),
    validateParams
] , deleteService )

//Administrador de hotel agrega servicio a una reservacion
api.post('/add-service-to-reservation', [
    validateJWT,
    check('idService', 'El idService es un parametro obligatorio para eliminar el servicio.').not().isEmpty(),
    check('idReservation', 'El idReservation es un parametro obligatorio para eliminar el servicio.').not().isEmpty(),
    validateParams
], addServiceToReservation)

module.exports = api;