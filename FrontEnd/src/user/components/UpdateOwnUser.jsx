import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { updateOwnUser } from '../api/ApiUser';

export const UpdateOwnUser = ({ isOpen, onClose, idUser }) => {

    if (!isOpen) {
        return null;
      }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Funcion para actualizar el propio usuaro
    const actualizarUsuario = async(e)=>{
        try {
            
            e.preventDefault();
            const result = await updateOwnUser(name, email,password)

            if(result){
                Swal.fire({
                    icon: "success",
                    title: "Exito",
                    text: "Usuario actualizado correctamente!",
                    confirmButtonText: "Ok",
                  })
            }


        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
    <Modal show={isOpen}>
          <Modal.Header>
            <Modal.Title className="text-dark">ID: {idUser}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Nueva inforamacion del usuario</h3>

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
                        <label>Email:</label>
                        <input
                            value={email}
                            onChange={({ target: { value } }) => setEmail(value)}
                            type="email"
                            className="form-control mt-1"
                            id="email"
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            value={password}
                            onChange={({ target: { value } }) => setPassword(value)}
                            type="password"
                            className="form-control mt-1"
                            id="password"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <div className="d-grid gap-2 mt-3">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={(e) => actualizarUsuario(e)}
                        >
                            Update User
                        </button>
                    </div>

                </div>

          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={onClose} style={{width: '75%', margin: 'auto'}}>
              Cancelar
            </button>
          </Modal.Footer>
        </Modal>
    </>
  )
}
