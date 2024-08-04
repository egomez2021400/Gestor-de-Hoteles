import React, { useEffect, useState } from 'react';
import { createRoom, listHotels, readRol } from '../api/ApiHotel';
import Swal from 'sweetalert2';

export const CreateRoom = () => {
  document.title = 'Crear habitación';

  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [hotel, setHotel] = useState('');

  // Hoteles
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const validateUser = async () => {
      const isAdmin = await readRol();
      if (isAdmin !== 'ADMIN') {
        window.location.href = '/';
      }
    };

    const listarHoteles = async () => {
      const hotels = await listHotels();
      if (hotels) {
        console.log(hotels);
        setHotels(hotels);
      } else {
        console.log('No se pudo obtener los hoteles');
      }
    };

    validateUser();
    listarHoteles();
  }, []);

  const crearHabitacion = async (e) => {
    try {
      e.preventDefault();

      const result = await createRoom(number, description, type, price, hotel);

      if (result) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Habitación creada correctamente!',
          confirmButtonText: 'Ok',
        }).then((r) => {
          if (r.isConfirmed) {
            window.location.href = '/';
          } else {
            window.location.href = '/';
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Agregar los hoteles al dropdown
  const renderHotels = () => {
    return hotels.map((hotel) => (
      <li key={hotel._id}>
        <button className="dropdown-item" type="button" onClick={() => setHotel(hotel._id)}>
          <b>Nombre: </b>
          {hotel.name} <b>- ID:</b> {hotel._id}
        </button>
      </li>
    ));
  };

  return (
    <>
      <div className="Auth-form-container" style={{ height: '90vh' }}>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Crear habitación</h3>

            <div className="form-group mt-3">
              <label>Número:</label>
              <input
                value={number}
                onChange={({ target: { value } }) => setNumber(value)}
                type="number"
                className="form-control mt-1"
                id="number"
                placeholder="Ingrese el número de habitación"
                required
              />
            </div>

            <div className="form-group mt-3">
              <label>Descripción:</label>
              <input
                value={description}
                onChange={({ target: { value } }) => setDescription(value)}
                type="text"
                className="form-control mt-1"
                id="description"
                placeholder="Ingrese la descripción"
                required
              />
            </div>

            <div className="form-group mt-3">
              <label>Tipo:</label>
              <select
                value={type}
                onChange={({ target: { value } }) => setType(value)}
                className="form-control"
                required
              >
                <option value="">Seleccione un tipo</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="twin">Twin</option>
              </select>
            </div>

            <div className="form-group mt-3">
              <label>Precio:</label>
              <input
                value={price}
                onChange={({ target: { value } }) => setPrice(value)}
                type="number"
                className="form-control mt-1"
                id="price"
                placeholder="Ingrese el precio"
                required
              />
            </div>

            <div className="form-group mt-3">
              <div className="dropup">
                <button
                  className="btn btn-success dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="dropdown"
                >
                  {hotel ? hotel : 'Hotel'}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                  {renderHotels()}
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => setHotel('')}
                  >
                    ...
                  </button>
                </ul>
              </div>
            </div>

            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                onClick={(e) => crearHabitacion(e)}
                className="btn btn-primary"
              >
                Crear nueva habitación
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
