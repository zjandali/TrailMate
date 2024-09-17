import React from 'react';
import { Box } from '@mui/material';
import TrailCard from './TrailCard';

const TrailList = ({ trails }) => (
  <Box 
    display="grid" 
    gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }} 
    gap={2} 
    sx={{ mt: 2 }}
  >
    {trails.map((trail) => (
      <TrailCard key={trail.id} trail={trail} />
    ))}
  </Box>
);

export default TrailList;
