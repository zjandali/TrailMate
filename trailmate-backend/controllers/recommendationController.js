// controllers/recommendationController.js
const openai = require('openai');
const User = require('../models/User');
const Trail = require('../models/Trail');

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('hikes');

    // Prepare user data
    const userData = {
      preferences: user.preferences,
      pastHikes: user.hikes.map((hike) => hike.name),
    };

    const aiResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: `Based on the user's preferences and past hikes, recommend 5 suitable hiking trails. User data: ${JSON.stringify(userData)}. Provide the trail IDs and names in JSON format.`,
            },
        ],
    });


    const recommendations = JSON.parse(aiResponse.data.choices[0].text.trim());

    // Fetch trail details
    const trails = await Trail.find({ id: { $in: recommendations.map((rec) => rec.id) } });

    res.json(trails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
