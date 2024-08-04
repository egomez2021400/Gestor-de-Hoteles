import axios from 'axios';
import Swal from 'sweetalert2';

const URL = 'http://localhost:3005/api/';

export const readEvents = async () => {
  try {
    const response = await axios.get(`${URL}read-events`);
    const events = response.data.events;
    return events;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al obtener los eventos',
      text: 'No se ha podido obtener la lista de eventos',
    });
    return [];
  }
}