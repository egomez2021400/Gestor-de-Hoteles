import axios from 'axios';

const URL = 'http://localhost:3005/api/';

export const createReservation = async (reservationData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${URL}create-reservation`, reservationData, {
      headers: {
        'x-token' : token
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
