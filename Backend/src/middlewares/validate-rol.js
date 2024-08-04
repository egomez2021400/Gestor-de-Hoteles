const {request, response} = require('express');

const adminRol = (req = request, res = response, next) => {

    if(!req.user) {
        return res.status(500).json({
            message: 'Verificar el rol sin el token'
        });
    }

    const {rol, name} = req.user
    if (rol !== 'ADMIN'){
        return res.status(401).json({
            message: `${name} no es ADMIN - no puede hacer esta accion`
        });
    }

    next();
}

module.exports = {adminRol};