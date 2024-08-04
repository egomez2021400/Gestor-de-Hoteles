'use strict'

const { validateManagerHotel } = require('../helpers/validateManagerHotel');
const Events = require('../models/event.model');
const Hotels = require('../models/hotel.model');

const createEvent = async (req, res) => {
    const {name, description, type, date, hotel} = req.body;

    try{

        // if( ! await validateManagerHotel( req.user._id , hotel ) ) return res.status(400).send({ msg: `El usuario logueado no es el manager del hotel.` })

        //Verificar si ya existe un evento con nombre y fecha igual 
        const eventExist = await Events.findOne({name, date});

        if(eventExist){
            return res.status(400).json({
                msg: 'Ya existe un evento con este nombre y fecha',
            });
        }

        //Verificar si el hotel ingresado existe
        const hotelExist = await Hotels.findById(hotel);

        if(!hotelExist){
            return res.status(400).json({
                msg: 'El hotel no existe',
            });
        }

        //Crear el evento
        //Se coloca parentesis ya que es una funcion, de lo contrario es una propiedad
        const newEvent = new Events({
            name,
            description, 
            type, 
            date: new Date(date).toISOString().substring(0, 10), //Obtener la fecha en formato ISO y obtener los primeros 10 caracteres en formato YYYY-MM-DD
            hotel,
        });

        //Guardar Evento 
        await newEvent.save();

        //Agregar evento al modelo hoteles 
        hotelExist.events.push(newEvent._id);
        await hotelExist.save();

        return res.status(200).send({
            msg: 'Evento creado correctamente', 
            event: newEvent,
        })

    }catch(error){
        console.error(error);
        res.status(500).json()
    }
}

const readEventsForHotel = async(req, res) =>{
    try {
        
        const {id} = req.body;

        if( ! ( await Hotels.findById(id) ) ) return res.status(404).send({message: `No se encontro el hotel en la base de datos.`})

        const eventsHotel = await Events.find({hotel: id});

        if(eventsHotel.length == 0) return res.status(404).send({message: `No se han encontrado eventos en este hotel`})
        
        return res.status(200).json({'Eventos del hotel': eventsHotel});

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la operacion de listar'})
    }
}

const readEvents = async(req, res)=>{
    try{
        const events = await Events.find();
        if(events.length == 0) return res.status(404).send({message: 'No se ha encontrado eventos registrados'});

        return res.status(200).send({ok: true, message: 'Eventos encontrados', events});
    }catch(error){
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la operacion'})
    }
}

const updateEvent = async(req, res)=>{

    const {id,name, description, type, date, hotel} = req.body;
    
    try {
        
        if( ! await validateManagerHotel( req.user._id , hotel ) ) return res.status(400).send({ msg: `El usuario logueado no es el manager del hotel.` })

        //Verificar si ya existe un evento con nombre y fecha igual 
        const nameEventExist = await Events.findOne({name});
        const dateEventExist = await Events.findOne({date});

        if((nameEventExist && nameEventExist._id != id) || (dateEventExist && dateEventExist._id != id) ){
            return res.status(400).json({
                msg: 'Ya existe un evento con este nombre o fecha.',
            });
        }

        //Verificar si el hotel ingresado existe
        const hotelExist = await Hotels.findById(hotel);

        if(!hotelExist){
            return res.status(400).json({
                msg: 'El hotel no existe',
            });
        }

        const _updateEvent = await Events.findByIdAndUpdate({_id: id}, {name:name,description:description,type:type,date:date, hotel: hotel}, {new:true});

        if(_updateEvent){
            return res.status(200).send({message: `Se actualizo el evento correctamente.`, _updateEvent})
        }else{
            return res.status(404).send({message: 'No se encontro el evento en la base de datos.'})
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la operacion de actualizar'})
    }
}

const deleteEvent = async(req, res) =>{
    try {
        
        const {id} = req.body;

        if( !  await validateManagerHotel( req.user._id , id ) ) return res.status(400).send({ msg: `El usuario logueado no es el manager del hotel.` })

        const _deleteEvent = await Events.findByIdAndDelete(id);
        
        if(_deleteEvent){ 

            const hotel = await Hotels.findOneAndUpdate( {_id: _deleteEvent.hotel},
                {
                    $pull: {
                        events: id,
                    },
                },
                {new: true} );
            

            res.status(200).send({message: `Se elimino el evento.`, _deleteEvent})

        }else{ 
            
            res.status(404).send({ok: false,message: `No se encontro el evento.`})
        
        }


    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la operacion'})
    }
}

module.exports = {createEvent,readEventsForHotel,updateEvent,deleteEvent, readEvents}