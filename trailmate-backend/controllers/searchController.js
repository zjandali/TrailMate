// controllers/searchController.js
const openai = require('../utils/openai');
const { fetchTrails, processOverpassData } = require('../utils/overpass');

exports.naturalLanguageSearch = async (req, res) => {
  try {
    const { query } = req.body;

    const prompt = `Extract location, difficulty, and features from this query: "${query}". Return as JSON.`;

    const aiResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 150,
    });

    const parameters = JSON.parse(aiResponse.data.choices[0].text.trim());

    // Get bounding box from location (simplified for example)
    const bbox = getBBoxFromLocation(parameters.location);

    const overpassData = await fetchTrails(bbox);

    let trails = processOverpassData(overpassData);

    trails = filterTrails(trails, parameters);

    res.json(trails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper functions
const getBBoxFromLocation = (location) => {
  // Implement geocoding to get bounding box
  return [south, west, north, east];
};

const filterTrails = (trails, parameters) => {
  // Implement filtering logic
  return trails;
};
