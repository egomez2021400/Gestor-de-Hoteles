import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { createReservation } from '../api/ApiReservation';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export const ReservationPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createReservation({
        room: roomId,
        checkIn,
        checkOut,
      });

      console.log(response);

      // Mostrar SweetAlert con mensaje de confirmación
      Swal.fire('¡Reserva creada!', 'Pronto enviaremos su factura.', 'success').then(() => {
        // Regresar a la página de hoteles
        navigate('/hoteles');
      });
    } catch (error) {
      console.error(error);
      //Mostrar error del backend en un SweetAlert 
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '500px' }}>
        <Card.Body>
          <Card.Title className="text-center">Detalles de la reserva</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="roomId">
              <Form.Label>ID de la habitación:</Form.Label>
              <Form.Control type="text" value={roomId} readOnly />
            </Form.Group>

            <Form.Group controlId="checkIn">
              <Form.Label>Fecha de check-in:</Form.Label>
              <Form.Control type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="checkOut">
              <Form.Label>Fecha de check-out:</Form.Label>
              <Form.Control type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            </Form.Group>
            <hr />

            <div className="d-flex justify-content-center">
              <Button variant="success" type="submit">
                Listo
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

