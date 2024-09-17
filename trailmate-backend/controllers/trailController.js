// controllers/trailController.js
const { openai } = require('../utils/openai');
const Trail = require('../models/Trail');

exports.getTrailDetails = async (req, res) => {
  try {
    const trailId = req.params.id;
    let trail = await Trail.findOne({ id: trailId });
    if (!trail) {
      // Fetch from Overpass API
      // ... (as shown earlier)
    }

    if (!trail.description) {
        const aiResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: `Provide a detailed and engaging description for a hiking trail with the following attributes:\n${JSON.stringify(trail.tags)}\nDescription:`,
                },
            ],
        });
      
      trail.description = aiResponse.data.choices[0].text.trim();
      // Save updated trail
      await trail.save();
    }

    res.json(trail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
