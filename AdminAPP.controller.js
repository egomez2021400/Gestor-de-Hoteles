'use strict'

const Usuarios = require('./src/models/user.model');
const bcrypt = require('bcrypt');
const {generateJWT} = require('./src/helpers/create-jwt');

//Crear Usuario por defecto
const adminApp = async() =>{
    try{
        const user = new Usuarios();
        user.name = 'Grupo';
        user.lastname = 'Informática';
        user.email = 'grupoinformatica@kinal.com';
        user.password = 'ADMINAPP';
        user.rol = 'ADMINAPP';
        const userEncontrado = await Usuarios.findOne({email: user.email})

        if(userEncontrado) return console.log('El AdminApp listo');

        //Encriptación de contraseña
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());

        //Guardar Usuario
        user = await user.save();

        if(!user) return console.log('El AdminApp no esta listo');
        return console.log('El AdminApp esta listo');
        
    }catch(error){
        console.log(error)
    }
}

module.exports = {adminApp};