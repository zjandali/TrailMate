// src/components/TrailCard.jsx
import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const TrailCard = ({ trail }) => (
  <Card>
    <CardContent>
      <Typography variant="h5">{trail.name}</Typography>
      <Typography variant="body2" color="textSecondary">
        Difficulty: {trail.difficulty}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" component={Link} to={`/trail/${trail.id}`}>
        View Details
      </Button>
    </CardActions>
  </Card>
);

export default TrailCard;
