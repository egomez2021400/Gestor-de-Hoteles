import React, { useState } from "react"
import { login } from "../api/ApiLogin";
import Swal from "sweetalert2";


export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result){
      Swal.fire({
        icon: 'success', 
        title: 'Genial!', 
        text: 'Ha iniciado sesion correctamente!', 
        confirmButtonText: 'Ok',
      }).then(r => {
        if(r.isConfirmed){
          window.location.href= "/hoteles";
        }else {
          window.location.href = "/hoteles";
        }
      });
    }
  };





  return (
    <>
        <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              value={email} onChange={({target: {value}}) => setEmail(value)}
              type="email"
              className="form-control mt-1"
              id="email"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
            value={password} onChange={({target: {value}}) => setPassword(value)}
              type="password"
              className="form-control mt-1"
              id="password"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" onClick={(e) => iniciarSesion(e)} className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
    </>
  )
}
