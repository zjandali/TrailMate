// src/components/NaturalLanguageSearch.jsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const NaturalLanguageSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Search for trails..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 1 }}>
        Search
      </Button>
    </Box>
  );
};

export default NaturalLanguageSearch;
