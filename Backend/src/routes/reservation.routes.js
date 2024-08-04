'use strict'
const {Router} = require('express');
const {validateJWT} = require('../middlewares/validate-jwt')
const {validateParams} = require('../middlewares/validate-params');
const {check} = require('express-validator');

const {createReservation,readUserReservations,readAllReservationHotel,
    updateReservation,deleteReservation,deleteReservationManager} = require('../controller/reservation.controller');

const api = Router();

api.post('/create-reservation', [
    validateJWT,
    check('room', 'El parametro room es obligatorio para crear una reservacion.').not().isEmpty(),
    check('checkIn', 'El parametro checkIn es obligatorio para crear una reservacion.').not().isEmpty(),
    check('checkOut', 'El parametro checkOut es obligatorio para crear una reservacion.').not().isEmpty(),
    validateParams
], createReservation);

api.get('/read-user-reservations', [
    validateJWT
], readUserReservations)

api.get('/read-all-reservations-hotel', [
    validateJWT,
    check('idHotel', 'El parametro idHotel es obligatorio para buscar las reservaciones.').not().isEmpty(),
    validateParams
], readAllReservationHotel)

api.put('/update-reservation',[
    validateJWT,
    check('idReservation', 'El parametro idReservation es obligatorio para editar una reservacion.').not().isEmpty(),
    check('room', 'El parametro room es obligatorio para crear una reservacion.').not().isEmpty(),
    check('checkIn', 'El parametro checkIn es obligatorio para crear una reservacion.').not().isEmpty(),
    check('checkOut', 'El parametro checkOut es obligatorio para crear una reservacion.').not().isEmpty(),
    validateParams
],updateReservation)

//Eliminar una reservacion del usuario logueado
api.delete('/delete-reservation',[
    validateJWT,
    check('idReservation', 'El parametro idReservation es obligatorio para eliminar una reservacion.').not().isEmpty(),
    validateParams
],deleteReservation)

//Funcion del MANAGER para eliminar reservaciones de su hotel
api.delete('/delete-reservation-manager',[
    validateJWT,
    check('idReservation', 'El parametro idReservation es obligatorio para eliminar una reservacion.').not().isEmpty(),
    validateParams
],deleteReservationManager)

module.exports = api;