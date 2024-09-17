// utils/overpass.js
const axios = require('axios');

const overpassUrl = 'https://overpass-api.de/api/interpreter';

async function fetchTrails(bbox) {
  // Validate bbox
  if (!bbox || bbox.length !== 4 || bbox.some((coord) => typeof coord !== 'number')) {
    throw new Error('Invalid bounding box parameters');
  }

  const query = `
    [out:json];
    (
      way["highway"="path"](${bbox.join(',')});
    );
    out body;
    >;
    out skel qt;
  `;

  console.log('Overpass Query:', query);

  try {
    const response = await axios.post(overpassUrl, query, {
      headers: { 'Content-Type': 'text/plain' },
      timeout: 30000, // 30 seconds timeout
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Overpass API Error:', error.response.data);
      throw new Error(`Overpass API Error: ${error.response.status} ${error.response.statusText}`);
    } else if (error.request) {
      console.error('No response from Overpass API:', error.request);
      throw new Error('No response from Overpass API');
    } else {
      console.error('Error:', error.message);
      throw new Error(`Error fetching data from Overpass API: ${error.message}`);
    }
  }
}

module.exports = { fetchTrails };
