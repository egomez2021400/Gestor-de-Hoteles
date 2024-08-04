import React, { useEffect, useState } from 'react'
import { createHotel, listHotels, listUsers, readRol } from '../api/ApiHotel'
import Swal from "sweetalert2";

export const CreateHotel = () => {

  document.title = 'Crear hotel'

  const [name, setName] = useState('');
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  //hook para cambiar el valor del dropdown
  const [selectedUser, setSelectedUser] = useState('');


  // Usuarios
  const [users, setUsers] = useState([])

  useEffect(() => {
    
    const validateUser = async() =>{
      const isAdmin = await readRol()
      if(isAdmin != 'ADMIN'){
        window.location.href = '/'
      }
    }

    const listarUsuarios = async() =>{
      const users = await listUsers()
      if(users){
        console.log(users);
        setUsers(users)
      }else{
        console.log(`No se pudo obtener los usurios`);
      }
    }

    validateUser();
    listarUsuarios();
  }, [])

  document.title = 'Crear hotel'

  const crearHotel = async(e) =>{
    
    try {
      
      e.preventDefault();
      
      const result = await createHotel(name, description, address, selectedUser)

      if(result){

        Swal.fire({
          icon: "success",
          title: "Exito",
          text: "Hotel creado correctamente!",
          confirmButtonText: "Ok",
        }).then((r) => {
          if (r.isConfirmed) {
            window.location.href = "/";
          } else {
            window.location.href = "/";
          }
        });

      }

    } catch (error) {
      console.error(error)
    }

  }

  // Agregar los usuarios al dropdown
  const renderUsers = () =>{
    return users.map((user) => (
      <li key={user._id}>
        <button className="dropdown-item" type="button" onClick={ () => setSelectedUser(user._id) }>
          <b>Nombre: </b>{user.name} <b>- ID:</b> {user._id}
        </button>
      </li>
    ))
  }
  

  return (
    <>
      <div className="Auth-form-container" style={{height: '90vh'}}>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Create Hotel</h3>

            <div className="form-group mt-3">


              <label>Name:</label>
              <input
                value={name}
                onChange={({ target: { value } }) => setName(value)}
                type="name"
                className="form-control mt-1"
                id="name"
                placeholder="Enter name"
                required
              />


            </div>
            <div className="form-group mt-3">


              <label>Description</label>
              <input
                value={description}
                onChange={({ target: { value } }) => setDescription(value)}
                type="description"
                className="form-control mt-1"
                id="description"
                placeholder="Enter description"
                required
              />


            </div>
            <div className="form-group mt-3">


              <label>address</label>
              <input
                value={address}
                onChange={({ target: { value } }) => setAddress(value)}
                type="address"
                className="form-control mt-1"
                id="address"
                placeholder="Enter address"
                required
              />


            </div>

            <div className="form-group mt-3">
              

            <div className="dropup">
              <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" 
              id='dropdown'
              >
                {/* Buscar si el valor de selectedUser ya es diferente de null, y ese sera el nombre del dropdwond */}
                {selectedUser ? selectedUser : 'Managaer del Hotel'}
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                {renderUsers()}
                <button className="dropdown-item" type="button" onClick={ () => setSelectedUser('') }>
                  ...
                </button>
                
              </ul>
            </div>


            </div>
            
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                onClick={(e) => crearHotel(e)}
                className="btn btn-primary"
              >
                Create new Hotel
              </button>
            </div>


          </div>
        </form>
      </div>
    </>
  )
}
