'use strict'

const {Router} = require('express');
const {check} = require('express-validator');
const { createUser, loginUser, editUser, deleteUser, readUsers,readOneUser, readOwnUser, redUserRol, editOwnUser} = require('../controller/user.controller');
const { validateParams } = require('../middlewares/validate-params');
const { validateJWT } = require('../middlewares/validate-jwt')
const { adminRol } = require('../middlewares/validate-rol')

const api = Router();

api.post('/create-user',[
    check('name', 'El parametro name es necesario para la creacion de un servicio.').not().isEmpty(),
    check('email', 'El parametro email es necesario para la creacion de un servicio.').not().isEmpty(),
    //check('password', 'El parametro password debe contar con 6 o mas caracteres.').isLength({min: 6}),
    validateParams
],createUser);

api.post('/login', loginUser);

api.get('/read-users',[
    validateJWT,
    adminRol
], readUsers)

api.get('/read-one-user',[
    validateJWT,
    adminRol,
    check('idUser', 'El parametro idUser es necesario para hacer la peticion.').not().isEmpty(),
    validateParams
], readOneUser)

//Ver propio usuario 
api.get('/read-own-user' , [
    validateJWT
], readOwnUser)

//Ver el rol que tienen el usuario
api.get('/read-rol', [
    validateJWT
], redUserRol)



api.put('/edit-user/:id',[
    validateJWT,
    adminRol
], editUser);

//Editar perfil del usuario logueado
api.put('/edit-own-user',[
    validateJWT,
], editOwnUser);

api.delete('/delete-client', validateJWT, deleteUser);

module.exports = api;