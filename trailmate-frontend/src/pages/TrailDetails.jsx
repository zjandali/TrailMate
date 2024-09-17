// src/pages/TrailDetails.jsx
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const TrailDetails = ({ match }) => {
  const [trail, setTrail] = useState({});
  const [weather, setWeather] = useState({});

  useEffect(() => {
    fetchTrail();
    fetchWeather();
    
  }, []);

  

  const fetchTrail = async () => {
    const response = await axios.get(`/api/trails/${match.params.id}`);
    setTrail(response.data);
  };

  const fetchWeather = async () => {
    const response = await axios.get(`/api/weather/${match.params.id}`);
    setWeather(response.data);
  };

  return (
    <div>
      <h1>{trail.name}</h1>
      <p>{trail.description}</p>
      <h3>Current Weather</h3>
      <p>{weather.weather ? weather.weather[0].description : 'Loading...'}</p>
    </div>
  );
};

export default TrailDetails;
