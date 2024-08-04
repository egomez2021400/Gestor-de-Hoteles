const {request, response} = require("express");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const Usuarios = require("../models/user.model");

const validateJWT = async(req = request, res = response, next) => {
    const token = req.header("x-token");

    //Si no viene el token
    if(!token){
        return res.status(401).send({
            message: "No hay token en la peticion",
        });
    }

    try{
        //decodificar token
        const payload = jwt.decode(token, process.env.SECRET_KEY);
        //Usuario se buscara por medio del id
        const userEncontrado = await Usuarios.findById(payload.uId);

        //Verificar token no ha expirado
        if(payload.exp <= moment().unix()){
            return res.status(500).send({message: "El token ha expirado"});
        }
        //Verificar el usuario sigue existiendo
        if(!userEncontrado){
            return res.status(401).send({
                message: "Token no valido - user no existe en la DB"
            });
        }
        // Crear un nuevo atributo en el request y se usa del lado del controller para validar si el rol
        // tiene permisos(si es igual a client o admin)
        req.user = userEncontrado;

        next();
    }catch(err){
        console.log(err)
        res.status(500).json({
            ok: false, 
            message: `Error con la comprobacion del token.`, 
            error: err,
        });
    }
}

module.exports = {validateJWT}