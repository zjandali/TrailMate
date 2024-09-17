// routes/conditions.js
const express = require('express');
const router = express.Router();
const Condition = require('../models/Condition');
const Trail = require('../models/Trail');
const auth = require('../middleware/auth');
const { io } = require('../server'); // Assuming you exported io from server.js
const { check, validationResult } = require('express-validator');
// POST /api/conditions
router.post(
  '/',
  auth,
  [
    check('trailId', 'Trail ID is required').notEmpty(),
    check('status', 'Status is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
  ],
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { trailId, status, description } = req.body;
      const userId = req.user.id;

      // Create a new condition
      const condition = new Condition({
        user: userId,
        trail: trailId,
        status,
        description,
      });

      await condition.save();

      // Optionally, add the condition to the trail's conditions array
      const trail = await Trail.findOne({ id: trailId });
      if (trail) {
        trail.conditions.push(condition._id);
        await trail.save();
      } else {
        // If the trail is not in the database, you might want to handle this case
      }

      // Emit the condition update via Socket.IO
      io.emit('conditionUpdate', {
        trailId,
        condition,
      });

      res.json(condition);
    } catch (error) {
      console.error('Error adding condition:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);
// GET /api/conditions/:trailId
router.get('/:trailId', async (req, res) => {
  try {
    const { trailId } = req.params;

    const conditions = await Condition.find({ trail: trailId }).populate('user', 'name');

    res.json(conditions);
  } catch (error) {
    console.error('Error fetching conditions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
