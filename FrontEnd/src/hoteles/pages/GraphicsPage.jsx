import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { topHotels } from "./peticionGraficas";
import '../graphics.css'
import { readRol } from "../api/ApiHotel";

export const GraphicsPage = () => {
  //Cambiar  nombre de la ventana
  document.title = "Graphics";

  const [hotels, setHotels] = useState([]);
  const [visists, setVisists] = useState([]);

  const requestHotels = async () => {
    await topHotels().then((response) => {
      let _hotels = [];
      let _visists = [];
      response.map((hotel) => {
        _hotels.push(hotel.name);
        _visists.push(hotel.visits);
      });
      setHotels(_hotels);
      setVisists(_visists);
    });
  };

  useEffect(() => {

    const validateUser = async() =>{
      const isAdmin = await readRol()
      if(isAdmin != 'ADMIN'){
        window.location.href = '/'
      }
    }

    requestHotels();
    validateUser();
  }, []);

  //Crear arreglo de objetos con los dos arreglos
  const data = [];

  for (let i = 0; i < hotels.length; i++) {
    data.push({ hotel: hotels[i], visits: visists[i] })
  }
//   console.log(data);

  return (
    <>
      <div className="m-4">
        <h1 className="d-flex justify-content-center">Hoteles mas visitados</h1>
        <hr />
      </div>
      {/* Inicio de  la grafica*/}
      <div className="graphics-container" >
        <ResponsiveContainer width='50%' aspect={2} >
          <BarChart
            data={data}
            width={100}
            height={300}
            margin={10}
          >
            <CartesianGrid
            strokeDasharray='4 1 2'></CartesianGrid>
            <XAxis dataKey='hotel'></XAxis>
            <YAxis dataKey='visits'></YAxis>
            <Tooltip></Tooltip>
            {/* <Legend></Legend> */}
            <Bar dataKey='visits' fill="skyBlue" ></Bar>
          </BarChart>

        </ResponsiveContainer>

      </div>
    </>
  );
};
