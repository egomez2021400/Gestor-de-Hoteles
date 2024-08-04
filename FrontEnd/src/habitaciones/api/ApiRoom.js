import axios from 'axios';

const URL = 'http://localhost:3005/api/';

export const getRoomsByHotel = async (hotelId) => {
    try {
      const response = await axios.get(`${URL}read-rooms-by-hotel/${hotelId}`);
      const rooms = response.data.room;
      console.log('Habitaciones del hotel:', rooms);
      return rooms;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw new Error('Error fetching rooms');
    }
  };
