// utils/processOverpassData.js
function processOverpassData(data) {
  const trails = [];
  const nodes = {};

  data.elements.forEach((element) => {
    if (element.type === 'node') {
      nodes[element.id] = [element.lat, element.lon];
    }
  });

  data.elements.forEach((element) => {
    if (element.type === 'way') {
      const trail = {
        id: element.id.toString(),
        name: element.tags.name || 'Unnamed Trail',
        coordinates: element.nodes.map((nodeId) => nodes[nodeId]),
        difficulty: element.tags.sac_scale || 'unknown',
        surface: element.tags.surface || 'unknown',
        tags: element.tags,
      };
      trails.push(trail);
    }
  });

  return trails;
}

module.exports = { processOverpassData };
