'use strict'
const { validateManagerHotel } = require('../helpers/validateManagerHotel');
const Bill = require('../models/bill.model');
const Hotel = require('../models/hotel.model');
const Room = require('../models/room.model');
const Reservation = require('../models/reservation.model');
const Service = require('../models/services.model');

const createBill = async(req, res) =>{
    try {
        
        let idUser  = req.user._id;
        const {idReservation} = req.body;

        const Hotel = await findHotelByReservation( idReservation );

        //Verificar que el usuario logueado sea el admin del hotel donde esta la reservacion
        const isAdmin = await validateManagerHotel( idUser, Hotel._id )
        if( !isAdmin ) return res.status(400).send({ message: `El usuario logueado no es el manager del hotel, solo el manager del hotel puede realizar faturas.` })

        //Contruir la factura utilizando la reservacion
        //Primero obtenemos todos los datos de la reservacion
        const _reservation = await Reservation.findById(idReservation);
        if( !_reservation ) return res.status(404).send({ message: `No se encontro la reservacion en la base de datos.` })

        //Creamos la nueva factura y comenzamos a llenar sus atributos
        const bill = new Bill();
        bill.reservation = idReservation;
        bill.user = _reservation.user;
        bill.room = _reservation.room;

        //Ordenamos los servicios para obtener un arreglo con la cantidad de cada servicio, junto a su precio y nombre
        const serviceReservation = await orderServices(_reservation.services);
        bill.services = [...serviceReservation];

        bill.total = _reservation.totalPrice;
        bill.paid = true;

        const newBill = bill.save();

        if(newBill){
            return res.status(200).send({message: `Se creo la factura correctamente`})
        }else{
            return res.status(400).send({message: `No se pudo crear la factura.`});
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la operacion.'})
    }
}

//Ver las facturas del usuario logueado
const readBills = async(req,res)=>{
    try {
        
        const idUser = req.user._id;

        //Buscar las facturas donde el usuario sea el mismo que el id del usuario logueado
        const bills = await Bill.find({user: idUser});

        if(bills.length == 0) return res.status(400).send({message: `El usuario no tienen reservaciones facturadas.`})
        
        res.status(200).json({ 'Facturas del usuario': bills });

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la operacion.'})
    }
}

//Ver todas las facturas de un hotel
const readAllsBills = async(req, res)=>{
    try {
        
        const bills = await Bill.find();
        if(bills.length == 0) return res.status(400).send({message: `No se encontraron facturas en la base de datos.`})

        res.status(200).json({ 'Facturas': bills })

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la operacion.'})
    }
}

const deleteBill = async(req, res)=>{
    try {
        
        const {idBill} = req.body;

        const findBill = await Bill.findByIdAndDelete(idBill);

        if(!findBill) return res.status(404).send({ message: `No se encontro la factura en la base de datos.` })

        return res.status(200).json({ 'Datos de la factura elminada': findBill });

    } catch (error) {
        console.error(error);
    }
}

// **************** Funciones de ayuda

const findHotelByReservation = async(idReservation)=>{
    try {
        const reservation = await Reservation.findById(idReservation)
        
        if( !reservation ) return console.log(`no se econtro la reservacion`);

        const room = await Room.findById(reservation.room)
        if( !room ) return console.log('no se econtro la habitacion');

        const hotel = await Hotel.findById(room.hotel)
        if( !hotel ) return console.log('no se econtro el hotel');

        return hotel;

    } catch (error) {
        console.error(error)
    }
}

const orderServices = async(services) =>{
    try {
        class service {
            constructor(name, price, quantity) {
                    this.name = name,
                    this.price = price,
                    this.quantity = quantity;
            }
        }

        let _orderedServices = [];

        for (let i = 0; i < services.length; i++) {
            let _service = await Service.findById(services[i].service);
            let newServiceToBill = new service( _service.name, _service.price , services[i].quantity);
            _orderedServices.push(newServiceToBill)
        }

        return _orderedServices;

    } catch (error) {
        console.error(error)
    }
}



module.exports = {createBill ,readBills,readAllsBills,deleteBill}