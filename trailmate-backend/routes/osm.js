// routes/osm.js
const express = require('express');
const axios = require('axios');

const router = express.Router();

// Function to build Overpass API query for hiking trails
const buildOverpassQuery = (lat, lon, radius) => {
  return `
    [out:json];
    (
      way(around:${radius},${lat},${lon})["highway"="footway"];
      way(around:${radius},${lat},${lon})["highway"="path"];
    );
    out body;
    >;
    out skel qt;
  `;
};

// Route to fetch trails using Overpass API
router.get('/trails', async (req, res) => {
  const { lat, lon, radius = 10000 } = req.query; // 10 km radius by default

  try {
    const query = buildOverpassQuery(lat, lon, radius);
    const response = await axios.post('https://overpass-api.de/api/interpreter', `data=${encodeURIComponent(query)}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const trails = response.data.elements.filter((element) => element.type === 'way');
    res.json({ trails });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trails from OSM.' });
  }
});

module.exports = router;
