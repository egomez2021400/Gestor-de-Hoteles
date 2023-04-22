'use strict'

const { Router } = require('express');
const { createUser, 
        updateUser, 
        deleteUser, 
        loginUser, 
        readUser} = require('../controllers/user.controller')
const {check} = require('express-validator');
const {validateParams} = require ('../middlewares/validate-params');
const {validateJWT} = require('../middlewares/validate-jwt');

const api = Router();

api.post('/create-user', createUser);

api.get('/read-user', readUser); //Realizar que el ADMINAPP solo el pueda visualizar la lista de users

api.put('/update-user/:id', validateJWT, updateUser);

api.delete('/delete-user/:id', validateJWT, deleteUser);

api.post('/login', loginUser);

module.exports = api;