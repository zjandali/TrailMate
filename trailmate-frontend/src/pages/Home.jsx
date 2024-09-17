// src/pages/Home.jsx
import React, { useState } from 'react';
import { Container } from '@mui/material';
import NaturalLanguageSearch from '../components/NaturalLanguageSearch';
import TrailList from '../components/TrailList';
import trailService from '../services/trailService';

const Home = () => {
  const [trails, setTrails] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await trailService.searchTrails(query);
      setTrails(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <NaturalLanguageSearch onSearch={handleSearch} />
      <TrailList trails={trails} />
    </Container>
  );
};

export default Home;
