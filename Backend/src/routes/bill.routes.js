const { Router } = require('express')
const { check } = require('express-validator')
const { validateParams } = require('../middlewares/validate-params')
const{ validateJWT } = require('../middlewares/validate-jwt')
const { adminRol } = require('../middlewares/validate-rol')

const { createBill,readBills,readAllsBills, deleteBill} = require('../controller/bill.controller')


const api = Router();

api.post('/create-bill',[
    validateJWT,
    check('idReservation','El id de la reservacion es obligatorio para generar la factura.').not().isEmpty(),
    validateParams
],createBill);

api.get( '/read-bills',[
    validateJWT,
    adminRol
], readBills)

api.get( '/read-alls-bills',[
    validateJWT,
    adminRol
], readAllsBills)

api.delete( '/delete-bill',[
    validateJWT,
    adminRol,
    check('idBill', 'El idBill es un parametro obligatorio para la eliminacion de una facturua.').not().isEmpty(),
    validateParams
], deleteBill )

module.exports = api;