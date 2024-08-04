import axios from 'axios';
import Swal from 'sweetalert2';

const URL = 'http://localhost:3005/api/';

export const listHotels = async () => {
  try {
    const response = await axios.get(`${URL}read-hotels`);
    console.log(response);
    let hotels = [];

    if (response.data && response.data.ok && Array.isArray(response.data.hotels)) {
      hotels = response.data.hotels; // Acceder a la matriz de hoteles dentro del objeto de respuesta
    } else {
      console.error("La respuesta no contiene una matriz de hoteles:", response.data);
    }

    return hotels;
  } catch (error) {
    console.error("Error al obtener los hoteles:", error);
    return [];
  }
};



export const CreateUser = async (_name, _email, _password, _rol) => {
  try {

      if(_rol == '' || !_rol) {_rol = 'USER'}

      const usersave = await axios.post(`${URL}create-user`, {
          name: _name,
          email: _email,
          password: _password,
          rol: _rol
      })

      // Mensaje si se guardo el usuario correctamente
      Swal.fire({
          icon: "success",
          title: "¡Usuario creado correctamente!",
          showConfirmButton: true,
          confirmButtonText: "OK"
      }).then(() => {
          // Redirigir al login cuando se haya guardado el usuario
          window.location.href = "/login";
      });
      
  } catch (error) {
      // Mostrar mensaje de error si no se guardo en el backend
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
          showConfirmButton: true,
          confirmButtonText: "OK"
      });
  }
};

export const readRol = async() =>{
  try {

    const token = localStorage.getItem('token')

    const response = await axios.get(`${URL}read-rol`, {
      headers:{
        'x-token': token
      }
    })
    
    return response.data.rol;

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
      showConfirmButton: true,
      confirmButtonText: "OK"
  }).then(r => {
    if(r.isConfirmed){
        if(error.response.data.message == 'El token ha expirado'){
            localStorage.removeItem('token')
            window.location.href = '/'
        }
    }else {
        if(error.response.data.message == 'El token ha expirado'){
            localStorage.removeItem('token')
            window.location.href = '/'
        }
    }
  });
  }
}

// Crear hotel
export const createHotel = async( name,description, address, admin )=>{
  try {
    
    if(admin.length == 0 || name.length == 0 || description.length == 0 || address.length == 0){
      Swal.fire({
        title: 'Debes llenar todos los requisitos para crear hotel',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }) 
      return null
    }

    const data = {
      name: name,
      description: description,
      address: address, 
      admin: admin
    }

    const token = localStorage.getItem('token');

    const response = await axios.post(`${URL}create-hotel`, data, {
      headers: {
        'x-token': token
      }
    });

    Swal.fire({
      icon: "success",
      title: "Hotel creado correctamente!",
      showConfirmButton: true,
      confirmButtonText: "OK"
      }).then(() => {
          // Redirigir a hoteles cuando se haya guardado el hotel
          window.location.href = "/";
      });    

  } catch (error) {
    console.error(error.response.data.msg)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.msg,
      showConfirmButton: true,
      confirmButtonText: "OK"
      }).then(r => {
        if(r.isConfirmed){
            if(error.response.data.message == 'El token ha expirado'){
                localStorage.removeItem('token')
                window.location.href = '/'
            }
        }else {
            if(error.response.data.message == 'El token ha expirado'){
                localStorage.removeItem('token')
                window.location.href = '/'
            }
        }
      });

  }
}

export const listUsers = async() =>{
  try {
    
    const token = localStorage.getItem('token');

    const response = await axios.get(`${URL}read-users` , {
      headers: {
        'x-token': token
      }
    })

    return response.data['Usuarios encontrados'];

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
      showConfirmButton: true,
      confirmButtonText: "OK"
      });

      if(error.response.data.message == 'El token ha expirado'){
        localStorage.removeItem('token')
        window.location.href = '/'
      }
  }
}

export const getHotelById = async (hotelId) => {
  try {
    const response = await axios.get(`${URL}get-hotel/${hotelId}`);
    const hotel = response.data.hotel;
    return hotel;
  } catch (error) {
    console.error('Error fetching hotel:', error);
    throw error;
  }
};

export const createRoom = async (number, description, type, price, hotel) => {
  try {
    const response = await axios.post(`${URL}create-room`, {
      number,
      description,
      type,
      price,
      hotel,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('No se ha podido crear la habitación');
  }
};