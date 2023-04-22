'use strict'

const Usuario = require('../models/user.model');
const Bill = require('../models/bill.model');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/create-jwt');

//Crear Usuario
const createUser = async(req, res) =>{
    const{name, email, password} = req.body;

    try{
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).send({
                message: `Usuario ya existente con el correo ${email}`,
                ok: false,
                usuario: usuario,
            });
        }

        usuario = new Usuario(req.body);

        //Encriptación de contraseña
        const saltos = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, saltos);

        //Guardar usuarios
        usuario = await usuario.save();

        //Crear token
        const token = await generateJWT(usuario.id, usuario.name, usuario.email);
        res.status(200).send({
            message: `Usuario ${usuario.name}creado correctamente`,
            ok: true,
            usuario,
            token: token,
        });
/*
        res.status(200).send({
            message: `Usuario ${name} creado`,
            ok: true,
            usuario: usuario,
        });
*/
    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            message: `No se pudo crear el usuario ${name}`,
            error: error,
        })
    }
};

//Listar Usuarios
const readUser = async(req, res) =>{
    try{
        const user = await Usuario.find();

        if(!user){
            res.status(400).send({
                message: 'No hay usuarios disponibles'
            })
        }else{
            res.status(200).json({"Usuarios encontrados": user});
        }
    }catch(error){
        throw new Error(error);
    }
};

//Editar Usuario
const updateUser = async(req, res) =>{
    try{
        const id = req.params.id;
        let editUser = {...req.body};

        //Encriptación de contraseña
        editUser.password = editUser.password
        ? bcrypt.hashSync(editUser.password, bcrypt.genSaltSync())
        : editUser.password

        const usercomplete = await Usuario.findByIdAndUpdate(id, editUser, {
            new: true,
        });

        if(usercomplete){
            const token = await generateJWT(usercomplete.id, usercomplete.name, usercomplete.email);
            return res.status(200).send({
                message: "Usuario actualizado correctamente",
                usercomplete,
                token,
            });
        }else{
            res
            .status(404).send({
                message: 'Este usuario no existe en la base de datos, o verifique parametros'
            })
        };

        }catch(error){
            throw new Error(error);
    }
};

//Eliminar Usuario
const deleteUser = async(req, res) =>{
    try{
        const id = req.params.id;
        const user = await Usuario.findById(id);

        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        await user.remove();

        res.json({message: 'Usuario eliminado correctamente'})

    }catch(error){
        res.status(500).send('Error en el servidor')
        console.log(error)
    }
};

//Login Usuario
const loginUser = async(req, res) =>{
    const {email, password} = req.body;
    try{
        const user = await Usuario.findOne({email});
        if(!user){
            return res
            .status(400)
            .send({
                ok: false,
                message: 'Usuario no existente'
            })
        };

        const validatePassword = bcrypt.compareSync(
            password,
            user.password
        );

        if(!validatePassword){
            return res.status(400).send({
                ok: false,
                message: 'Password incorrecto'
            });
        };

        const token = await generateJWT(user.id, user.name, user.email);
        res.status(500)
        .json({
            message: `Usuario logeado correctamente, ${user.name}`,
            ok: true,
            uId: user.id,
            name: user.name,
            email: user.email,
            token: token,
        });

    }catch(error){
        res.status(500).json({
            ok: false,
            message: 'Usuario no registrado'
        });
    }
};

module.exports = {  createUser, 
                    readUser,
                    updateUser,
                    deleteUser,
                    loginUser};