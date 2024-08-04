import axios from 'axios';

const URL = 'http://localhost:3005/api/';

export const getServicesByHotel = async (hotelId) => {
  try {
    const response = await axios.get(`${URL}read-services`, {
      params: {
        idHotel: hotelId,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const addServiceToReservation = async (serviceId, reservationId) => {
  try {
    const response = await axios.post(`${URL}add-service-to-reservation`, {
      idService: serviceId,
      idReservation: reservationId,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
