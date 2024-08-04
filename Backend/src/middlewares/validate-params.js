const {validationResult} = require("express-validator");
// Expres-validator es para validar parametros en general (sanitizador), el validationResult es para validar objetos, parametros y otras cosas de manera mas especifica
const validateParams = async (req, res, next)=>{
    
    // Si se encuentran parametros no cumplidos en el req, entonces se va ejecutar el if
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({
            ok: false,
            errors: errors.mapped(),
        })
    }
    next();
}

module.exports = {validateParams};