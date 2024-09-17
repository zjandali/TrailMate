// routes/search.js
const router = require('express').Router();
const openai = require('openai');
const { fetchTrails } = require('../utils/overpass');
const { processOverpassData } = require('../utils/processOverpassData');

router.post('/natural', async (req, res) => {
  try {
    const { query } = req.body;

    // Use LLM to interpret the query
    const aiResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: `Extract the following details from the user's query for hiking trails: location, difficulty, length, features. Return as JSON.\n\nUser Query: "${query}"\nJSON:`,
            },
        ],
    });
  

    // Parse the AI's response
    const parametersText = aiResponse.data.choices[0].text.trim();
    let parameters;
    try {
      parameters = JSON.parse(parametersText);
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return res.status(500).json({ message: 'Error processing query' });
    }

    // Use a geocoding API to get the bounding box from the location
    const geocodeResponse = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: parameters.location,
        format: 'json',
        limit: 1,
      },
    });

    if (geocodeResponse.data.length === 0) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const { boundingbox } = geocodeResponse.data[0];
    const bbox = [
      boundingbox[0], // south
      boundingbox[2], // west
      boundingbox[1], // north
      boundingbox[3], // east
    ];

    // Fetch trails from Overpass API within the bounding box
    const cacheKey = `trails:${bbox.join(',')}`;
    let trails = await getCache(cacheKey);
    if (!trails) {
      const data = await fetchTrails(bbox);
      trails = processOverpassData(data);
      await setCache(cacheKey, trails);
    }

    // Filter trails based on difficulty, length, and features
    trails = filterTrails(trails, parameters);

    res.json(trails);
  } catch (error) {
    console.error('Error in natural language search:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
