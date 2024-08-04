import React from 'react'
import { Modal } from 'react-bootstrap';
import { deleteOwnUser } from '../api/ApiUser';

export const DeleteOwnUser = ({ isOpen, onClose , email}) => {

    if (!isOpen) {
        return null;
      }
    const eliminarUsuario = async(e)=>{
        try {
            
            e.preventDefault();
            const result = await deleteOwnUser()

            if(result){
                Swal.fire({
                    icon: "success",
                    title: "Exito",
                    text: "Usuario eliminado correctamente!",
                    confirmButtonText: "Ok",
                    })
            }


        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
        <Modal show={isOpen} style={{marginTop: '20vh'}}>
          <Modal.Header>
            <Modal.Title className="text-dark">Usuario: <i>{email}</i></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">¿Realmente desea eliminar su usuario?</h3>
                    <hr />
                    <div className="d-grid gap-2 mt-3">
                        <button
                            type="submit"
                            className="btn btn-warning"
                            onClick={(e) => eliminarUsuario(e)}
                            style={{color: 'white'}}
                        >
                            <b>Eliminar usuario</b>
                        </button>
                    </div>

                </div>

          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-success" onClick={onClose} style={{width: '75%', margin: 'auto'}}>
              Cancelar
            </button>
          </Modal.Footer>
        </Modal>
    </>
  )
}
