import React, { useEffect, useState } from 'react'
import { listUsers, readRol } from '../../hoteles/api/ApiHotel'
import '../styles/AllUsers.css'

export const AllUsers = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const validateUser = async() =>{
            const isAdmin = await readRol()
                if(isAdmin != 'ADMIN'){
                    window.location.href = '/'
                }
        }

        const listarUsuarios = async() =>{
            const _users = await listUsers()
            if(_users){
                console.log(_users);
                setUsers(_users)
            }else{
              console.log(`No se pudo obtener los usurios`);
            }
          }

        validateUser();
        listarUsuarios()
    }, [])

  return (
    <>
        <div className="cards-container">
            {users.map(
                (user) => (
                    <div className="card" style={{padding: '20px'}} key={user._id}>
                        <h6 style={{fontSize: '10px', margin: 'auto', paddingBottom: '10px', color: 'skyBlue'}}>{user._id}</h6>
                        <img style={{margin: 'auto'}} src="https://cdn-icons-png.flaticon.com/512/709/709722.png" alt="iconHotel" width={'100px'}/>
                        <div className="container">
                            <hr />
                            <h6><b>Nombre:</b>{' '+user.name}</h6> 
                            <h6><b>Email:</b>{' '+user.email}</h6>                       
                            <h6><b>Rol:</b>{' '+user.rol}</h6>                       
                        </div>
                    </div>
                )
            )}

        </div>
    </>
  )
}
