// routes/trails.js
const express = require('express');
const router = express.Router();
const { fetchTrails } = require('../utils/overpass');
const { processOverpassData } = require('../utils/processOverpassData');
const { getCache, setCache } = require('../utils/cache');
const Trail = require('../models/Trail');

// GET /api/trails?bbox=south,west,north,east
router.get('/', async (req, res) => {
  try {
    const bbox = req.query.bbox.split(',').map(Number);
    const cacheKey = `trails:${bbox.join(',')}`;

    // Check cache
    let trails = await getCache(cacheKey);
    if (trails) {
      return res.json(trails);
    }

    // Fetch trails from Overpass API
    const data = await fetchTrails(bbox);
    trails = processOverpassData(data);

    // Cache the trails
    await setCache(cacheKey, trails);

    res.json(trails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/trails/:id
router.get('/:id', async (req, res) => {
  try {
    const trailId = req.params.id;
    // Check cache
    let trail = await getCache(`trail:${trailId}`);
    if (trail) {
      return res.json(trail);
    }

    // Fetch trail data from Overpass API
    // Note: Fetching individual trails may require adjusting your Overpass query.

    // For demonstration, we'll assume the trail data is available.

    // Cache the trail
    await setCache(`trail:${trailId}`, trail);

    res.json(trail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
