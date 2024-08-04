import React, { useState } from "react";

import Swal from "sweetalert2";
import { CreateUser } from "../../hoteles/api/ApiHotel";

export const CreateAccount = () => {
    localStorage.removeItem('token');
    document.title = 'Create Account'

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_name, setName] = useState('')

  const crearCuenta = async (e) => {
    e.preventDefault();
    const result = await CreateUser(_name,email, password);

    if (result) {
      Swal.fire({
        icon: "success",
        title: "Genial!",
        text: "Usuario creado correctamente",
        confirmButtonText: "Ok",
      }).then((r) => {
        if (r.isConfirmed) {
          window.location.href = "/";
        } else {
          window.location.href = "/";
        }
      });
    }
  };

  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Create Account</h3>

            <div className="form-group mt-3">


              <label>Name:</label>
              <input
                value={_name}
                onChange={({ target: { value } }) => setName(value)}
                type="_name"
                className="form-control mt-1"
                id="_name"
                placeholder="Enter name"
                required
              />


            </div>
            <div className="form-group mt-3">


              <label>Email address</label>
              <input
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
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
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                type="password"
                className="form-control mt-1"
                id="password"
                placeholder="Enter password"
                required
              />


            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                onClick={(e) => crearCuenta(e)}
                className="btn btn-primary"
              >
                New Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
