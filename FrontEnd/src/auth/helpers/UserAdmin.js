import { readRol } from "../../hoteles/api/ApiHotel"

export const userIsAdmin = () =>{
    try {
        const isAdmin = readRol()
        if(isAdmin != 'ADMIN') return false;
        return true;

    } catch (error) {
        console.error(error)
    }
}