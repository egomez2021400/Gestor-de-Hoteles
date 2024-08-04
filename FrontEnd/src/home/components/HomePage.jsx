import React from 'react';
import '../styles/index.css';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  document.title = 'Home';
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-md" style={{ backgroundColor: '#e3f2fd' }}>
        <div className="container-fluid">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <a className="navbar-brand" href="#">
            <img id="navbar-logo"src="https://cdn-icons-png.flaticon.com/512/5900/5900195.png" alt="Logo"/>Gestor de Hoteles
            </a>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end text-bg-dark" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item mt-2">
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <a className="nav-link">Información</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <a className="nav-link"><button type="button" className="btn btn-primary custom-btn">Iniciar Sesión</button></a>
                  </Link>
                </li>
                <li>
                  <Link to="/createAccount" style={{ textDecoration: 'none' }}>
                    <a className="nav-link"><button type="button" className="btn btn-info custom-btn">Crear una cuenta</button></a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Cuerpo del inicio */}
      <div className="image-and-text" id="best-hotels">
        <p>Los mejores hoteles para tu destino</p>
      </div>

      <div className="choose-from-catalogue">
        <div className="choose-from-catalogue-phrase">
          <p>Escoge el <span>hotel</span> que más te guste dentro de nuestro catálogo.</p>
        </div>

        <div className="carousel-left">
          <div id="carouselExampleFade" className="carousel slide carousel-fade">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="img1" />
              </div>
              <div className="carousel-item">
                <img src="https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="img2" />
              </div>
              <div className="carousel-item">
                <img src="https://images.pexels.com/photos/2255424/pexels-photo-2255424.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="im3" />
              </div>
              <div className="carousel-item">
                <img src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" alt="im3" />
              </div>
              <div className="carousel-item">
                <img src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" alt="im3" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <div className="image-and-text" id="events-hotel">
        <p>Conoce los eventos de todos los hoteles.</p>
      </div>
    </>
  );
};
