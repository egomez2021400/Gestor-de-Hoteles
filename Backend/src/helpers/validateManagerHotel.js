
const Hotel = require('../models/hotel.model');
const User = require('../models/user.model');

const validateManagerHotel = async(idUser, idHotel) =>{
    try {

        const userRol = await User.findById(idUser);
        if(userRol){
            if(userRol.rol == 'ADMIN') return true
        }

        const hotel = await Hotel.findById(idHotel);

        const hotelAdmin = hotel.admin.toString();
        
        const user = idUser.toString();

        return (hotelAdmin == user);

    } catch (error) {
        console.error(error);
    }
}

module.exports = {validateManagerHotel};