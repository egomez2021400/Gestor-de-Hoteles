'use strict'

const { validateManagerHotel } = require('../helpers/validateManagerHotel');
const Hotels = require('../models/hotel.model');
const Usuarios = require('../models/user.model');

const createHotel = async(req, res) => {
    const {name, description, address, admin} = req.body;

    try{
        //Verificar si ya existe un hotel con el mismo nombre  
        const hotel = await Hotels.findOne({name}); 
        if(hotel){
            return res.status(400).json({
                msg: 'Ya existe un hotel con este nombre',
                ok: false, 
                hotel: hotel,
            })
        }
        //Verificar si el admin existe en el modelo User  
        const adminExist = await Usuarios.findById(admin); 
        if(!adminExist){
            return res.status(400).json({
                msg: 'No se encontro un usuario con este nombre', 
                ok: false, 
                admin: admin,
            })
        }

        //Crear nuevo hotel 
        const newHotel = await Hotels.create({name, description, address, admin});

        //Agregar el hotel al usuario admin 
        adminExist.hotel = newHotel._id; // Busca al usuario admin en la DB, asocia al usuario admin con el nuevo hotel
        if(adminExist.rol != 'ADMIN') adminExist.rol = 'MANAGER';
        await adminExist.save();

        return res.status(200).send({
            msg: `${name} creado correctamente`,
            ok: true, 
            hotel: newHotel
        })

    }catch(error){
        console.error(error);
        res.status(500).json({
            ok: false, 
            msg: 'No se ha creado el hotel', 
            error: error,
        })
    }
}


const readHotels = async(req,res)=>{
    try {
        
        const hotels = await Hotels.find();
        if(hotels.length == 0) {
            return res.status(404).send({message: 'No se han encontrado hoteles registrados.'});
        } else {
            return res.status(200).send({ok: true, message: 'Hoteles encontrado', hotels});
        }
    } catch (error) {
        res.status(404).send({
            message: 'No se ha podido completar la operacion', 
            error
        });
    }
}

const editHotel = async(req, res) => {
    const {name, description, address, admin} = req.body;
    const {id} = req.params;

    try{
        //Verificar si el hotel ya existe 
        const hotelExist = await Hotels.findOne({name});

        if ( ! ( await validateManagerHotel(admin, id) ) ) return res.status(400).send({
            message: 
            `El usuario no es el manager del hotel. Solo el manager puede realizar cambios en el hotel`
            })

        if(hotelExist && hotelExist._id != id){
            return res.status(400).json({
                msg: 'El nombre ya existe'
            })
        }

        // Obtener el hotel anterior
        const hotelAnterior = await Hotels.findById(id);

        //Comprobar que el nuevo admin exista
        const existsAdmin = await Usuarios.findById(admin);
        if( !existsAdmin ) return res.status(404).send( { message: `El nuevo administrador no se encontro en la base de datos.` } )

        // Buscar y actualizar el admin anterior
        if (hotelAnterior.admin) {
        const adminAnterior = await Usuarios.findById(hotelAnterior.admin);
        adminAnterior.hotel = null;
        if(adminAnterior.rol != 'ADMIN') adminAnterior.rol = 'USER'
        await adminAnterior.save();
        }

            // Verificar si el usuario a cambiar existe  
            const adminExist = await Usuarios.findById(admin);

            if(!adminExist){
                return res.status(400).json({
                    msg: 'El usuario admin no existe'
                })
            }

            //Actualizar los datos del hotel 
            const hotelActualizado = await Hotels.findByIdAndUpdate(
                id, 
                {name, description, address, admin}, 
                {new: true}
            );

            // Actualizar el hotel en la lista de hoteles del usuario admin 
            adminExist.hotel = hotelActualizado._id;
            if(adminExist.rol != 'ADMIN') adminExist.rol = 'MANAGER'
            await adminExist.save();

            return res.status(200).send({
                msg: 'Hotel actualizado correctamente', 
                hotel: hotelActualizado
            })
        
    }catch(error){
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar el hotel'
        })
    }

}

const deleteHotel = async(req, res) => {
    const {id} = req.params;

    try{
        //Buscar hotel a eliminar 
        const hotel = await Hotels.findById(id);

        //Verificar si el hotel existe  
        if(!hotel){
            return res.status(404).json({
                msg: 'El hotel no existe'
            });
        }

        //Eliminar el hotel 
        await hotel.remove();

        //Eliminar el hotel de la lista de hoteles del usuario admin 
        const admin = await Usuarios.findOne({hotel: id});
        if(admin) {
            admin.hotel = null; 
            if(admin.rol != 'ADMIN') admin.rol = 'USER'
            await admin.save();
        }

        return res.json({
            message: 'Hotel eliminado correctamente'
        })
    }catch(error){
        console.error(error);
        res.status(500).json({msg: 'Error al eliminar al hotel'})
    }
}

//Ver los hoteles mas visitados:
const mostVisitedHotels = async(req, res)=>{
    try {
        
        const findHotels = await Hotels.find().sort({ visits: -1 }).limit(10);

        if(findHotels.length == 0) return res.status(404).send({message: `No se han agregado hoteles.`});

        res.status(200).send({ message: `Hoteles mas visitados:`, findHotels })

    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Error al eliminar al visualizar los hoteles.'})
    }
}

const getHotelById = async (req, res) => {
    try {
      const { hotelId } = req.params;
  
      // Buscar el hotel por ID en la base de datos
      const hotel = await Hotels.findById(hotelId);
  
      if (!hotel) {
        return res.status(404).send({ message: 'No se ha encontrado el hotel.' });
      }
  
      return res.status(200).send({ ok: true, message: 'Hotel encontrado', hotel });
    } catch (error) {
      console.error('Error al obtener el hotel:', error);
      res.status(500).send({ message: 'Error al obtener el hotel' });
    }
  };

module.exports = {createHotel,readHotels, editHotel, deleteHotel , mostVisitedHotels, getHotelById}