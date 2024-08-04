import React, { useEffect, useState } from 'react';
import { readEvents } from '../api/ApiEvento';
import { getHotelById } from '../../hoteles/api/ApiHotel';

export const EventoPage = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [eventCards, setEventCards] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await readEvents();
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const renderEventCards = async () => {
      const cards = await Promise.all(
        filteredEvents.map(async (event) => {
          const { name = '', description = '', hotelId = '', date = '' } = event;
          const searchQuery = searchTerm.toLowerCase();
          const formattedDate = date ? new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '';

          let hotelName = '';
          if (hotelId) {
            try {
              const hotel = await getHotelById(hotelId);
              hotelName = hotel.name;
            } catch (error) {
              console.error('Error fetching hotel:', error);
            }
          }

          return (
            <div className="card mb-3" key={event._id}>
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text">Fecha: {formattedDate}</p>
                <p className="card-text">Hotel: {hotelName}</p>
              </div>
            </div>
          );
        })
      );

      setEventCards(cards);
    };

    const filteredEvents = events.filter((event) => {
      const { name = '', description = '', hotelId = '', date = '' } = event;
      const searchQuery = searchTerm.toLowerCase();
      return (
        name && name.toLowerCase().includes(searchQuery) ||
        description && description.toLowerCase().includes(searchQuery) ||
        (hotelId && hotelId.toLowerCase().includes(searchQuery))
      );
    });

    renderEventCards();
  }, [events, searchTerm]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <h1>Eventos</h1>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre, descripción o ID de hotel"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <div className="input-group-append">
        </div>
      </div>
      <div className="row">
        {eventCards.length > 0 ? (
          eventCards
        ) : (
          <p>No se encontraron eventos.</p>
        )}
      </div>
    </div>
  );
};
