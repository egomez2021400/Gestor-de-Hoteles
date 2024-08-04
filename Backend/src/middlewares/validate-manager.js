const {request, response} = require('express');

const adminManager = (req = request, res = response, next) => {

    if(!req.user) {
        return res.status(500).json({
            message: 'Verificar el rol sin el token'
        });
    }

    const {rol, name} = req.user
    if (rol !== 'MANAGER'){
        return res.status(401).json({
            message: `${name} no es MANAGER - no puede hacer esta accion`
        });
    }

    next();
}

module.exports = {adminManager};