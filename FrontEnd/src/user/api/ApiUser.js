import axios from 'axios';
import { getDropdownMenuPlacement } from 'react-bootstrap/esm/DropdownMenu';
import Swal from "sweetalert2";

const URL = 'http://localhost:3005/api/';

export const getOwnUser = async(_token) =>{
    try {
        const getUser = await axios.get(`${URL}read-own-user`, {
            headers:{
                'x-token': _token
            }
        })

        return getUser.data.findUser;

    } catch (error) {
        console.error(error);
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

// Editar el perfil propio
export const updateOwnUser = async(name, email, password) =>{
    try {
        
        if(name.length == 0 || email.length == 0 || password.length == 0){
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

        const token = localStorage.getItem('token');

        const data = {
            name: name,
            email: email,
            password: password
        }

        await axios.put(`${URL}edit-own-user`, data, {
            headers:{
                'x-token': token
            }
        })

        Swal.fire({
            icon: "success",
            title: "Usuario editado correctamente!",
            showConfirmButton: true,
            confirmButtonText: "OK"
        }).then((r) => {
            if (r.isConfirmed) {
                window.location.href = "/user";
              } else {
                window.location.href = "/user";
              }
          })

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

// Eliminar usuario propio
export const deleteOwnUser = async() =>{
    try {
        
        const token = localStorage.getItem('token');

        await axios.delete(`${URL}delete-client`, {
            headers:{
                'x-token': token
            }
        })

        Swal.fire({
            icon: "success",
            title: "Tu usuario ha sido eliminado correctamente",
            showConfirmButton: true,
            confirmButtonText: "OK"
        }).then((r) => {
            localStorage.removeItem('token')
            if (r.isConfirmed) {
                window.location.href = "/";
              } else {
                window.location.href = "/";
              }
          })

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