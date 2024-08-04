import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faSignOutAlt, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { readRol } from '../hoteles/api/ApiHotel';


export const Navbar = () => {

  const [rol, setRol] = useState(false)

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    useEffect(() => {
      
      const rolAdmin = async() => {
        try {
          
          const rol = await readRol();
          console.log(rol);
          if(rol == 'ADMIN'){
            setRol(true)
          }
  
        } catch (error) {
          console.error(error)
        }
      }

      rolAdmin();

    }, [])

    const renderAllUsers = () =>{
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/view-all-users">
            | Usuarios de la aplicacion
          </Link>
        </li>
      )
    }
    

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand mt-2 mt-lg-0" to="/hoteles">
            <img
              src="https://cdn2.steamgriddb.com/file/sgdb-cdn/icon/851b10e5b105815806efcf78b53588f4/32/256x256.png"
              height="30"
              alt="Hotel Logo"
              loading="lazy"
            />
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/hoteles">
                Hoteles
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/eventos">
                Eventos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reservacion">
                Facturas
              </Link>
            </li>
            {rol && renderAllUsers()}
          </ul>
        </div>
        <div className="d-flex align-items-center">
          <Link className="text-reset me-3" to="/user">
            <FontAwesomeIcon icon={faUser} />
          </Link>
          
          <div className="dropdown">
            <Link
              className="nav-link text-reset me-3 hidden-arrow"
              to="/login"
              id="navbarDropdownMenuLink"
              role="button"
              aria-expanded="false"
              onClick={() => cerrarSesion()}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
