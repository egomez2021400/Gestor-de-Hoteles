import { useEffect, useState } from "react";
import { getOwnUser } from "../api/ApiUser";
import { UpdateOwnUser } from "./UpdateOwnUser";
import { DeleteOwnUser } from "./DeleteOwnUser";

export const UsuarioPage = () => {
  const [user, setUser] = useState({});
  // estado para mostrar o no la ventana modal
  const [showModal, setShowModal] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)

  document.title = 'Usuario'

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getOwnUser(token);
        setUser(result);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
    
    console.log(user.email);
    fetchUser();
  }, []);

  // Metodos para manejar el estado de la modal
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };


  return (
    <>

      <div className="card shadow" style={{width: '18rem', margin: 'auto', marginTop: '20px'}}>
        <img src="https://xsgames.co/randomusers/avatar.php?g=pixel" className="card-img-top" alt="user" style={{width: '80%', margin: 'auto', marginTop: '10px', borderRadius: '50%'}}/>
        <div className="card-body" style={{margin: 'auto', }}>
          <h5 className="card-title" style={{color: 'Black'}}>Datos de tu cuenta</h5>
        </div>
        <ul className="list-group list-group-flush">

          <li className="list-group-item" style={{display: 'flex'}}><h6 style={{marginRight: '10px', color: 'gray'}}>Nombre:</h6><h6>{user.name}</h6></li>
          <li className="list-group-item" style={{display: 'flex'}}><h6 style={{marginRight: '10px', color: 'gray'}}>Email:</h6><h6>{user.email}</h6></li>
          <li className="list-group-item" style={{display: 'flex'}}><h6 style={{marginRight: '10px', color: 'gray'}}>Rol:</h6><h6>{user.rol}</h6></li>

        </ul>
      </div>
        <div className="card" style={{width: '18rem', margin: 'auto', marginTop: '20px'}}>
          <button className="btn btn-warning" style={{color: 'white'}} onClick={() => {setShowModal(true)}} >Editar mi perfil</button>
          <button className="btn btn-danger mt-1" onClick={ () =>{setShowModalDelete(true)} }>Eliminar mi perfil</button>
        </div>
      <UpdateOwnUser isOpen={showModal} onClose={ () =>{ handleCloseModal() }} idUser={user._id} ></UpdateOwnUser>
      <DeleteOwnUser email={user.email} isOpen={showModalDelete} onClose={ () => { handleCloseModalDelete() } } ></DeleteOwnUser>
    </>
  );
};
