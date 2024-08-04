import { Route, Routes, Navigate } from 'react-router-dom';
import {HotelesPage } from './hoteles';
import { LoginPage, isUserAuthenticated } from './auth';
import { Navbar } from "./components";
import "./styles.css";
import { RoomsPage } from "./habitaciones/components/RoomsPage";
import { HomePage } from "./home/components/HomePage";
import { CreateAccount } from "./auth/pages/CreateAccount";
import { ReservationPage } from "./reservations/components/ReservationPage";
import {GraphicsPage} from "./hoteles/pages/GraphicsPage";
import {AllUsers} from "./user/components/AllUsers";
import { UsuarioPage } from './user/components/UsuarioPage';
import { CreateHotel } from './hoteles/pages/CreateHotel';
import { EventoPage } from './eventos/components/EventoPage';
import { CreateRoom } from './hoteles/pages/CreateRoom';

export const AppRouter = () => {
  return (
    <>
      {isUserAuthenticated() && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={isUserAuthenticated() ? <HotelesPage /> : <HomePage />}
        />
        <Route
          path="/user"
          element={
            isUserAuthenticated() ? (
              <UsuarioPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isUserAuthenticated() ? (
              <LoginPage />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/createAccount"
          element={
            !isUserAuthenticated() ? (
              <CreateAccount />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/hoteles"
          element={
            isUserAuthenticated() ? (
              <HotelesPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/rooms/:hotelId"
          element={
            isUserAuthenticated() ? (
              <RoomsPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/reservation/:roomId"
          element={
            isUserAuthenticated() ? (
              <ReservationPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
         {/* Ruta para crear una cuenta */}
         <Route
          path="/createAccount"
          element={
            isUserAuthenticated() ? (
              <Navigate to="/"></Navigate>
            ) : (
              <CreateAccount></CreateAccount>
            )
          }
        ></Route>

          {/* Ruta para agregar hotel, si el usuario no esta logueado lo envia al login, si el usuario no es admin lo envia a
          hoteles */}
          <Route
          path="/createHotel"
          element={
            isUserAuthenticated() ? <CreateHotel></CreateHotel> : <Navigate to='/'></Navigate>
          }></Route>

          {/* Ruta para graficas */}
          <Route
          path="/graphicsHotels"
          element={
            isUserAuthenticated() ? <GraphicsPage></GraphicsPage> : <Navigate to='/'></Navigate>
          }
          ></Route>
          {/* Ruta para visualizar todos los usuarios */}
          <Route
          path="/view-all-users"
          element={
            isUserAuthenticated() ? <AllUsers></AllUsers> : <Navigate to={'/'}></Navigate>
          }>
          </Route>
           {/* Ruta para eventos */}
        <Route
          path="/eventos"
          element={
            isUserAuthenticated() ? (
              <EventoPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* Ruta para crear cuarto */}
        <Route
          path="/createRoom"
          element={
            isUserAuthenticated() ? <CreateRoom></CreateRoom> : <Navigate to='/'></Navigate>
          }
          ></Route>
      </Routes>
    </>
  );
};
