// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Trail = require('../models/Trail');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
// POST /api/reviews
router.post(
    '/',
    auth,
    [
      check('trailId', 'Trail ID is required').notEmpty(),
      check('rating', 'Rating is required and should be a number between 1 and 5').isInt({ min: 1, max: 5 }),
      check('comment', 'Comment is required').notEmpty(),
    ],
    async (req, res) => {
      // Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const { trailId, rating, comment } = req.body;
        const userId = req.user.id;
  
        // Create a new review
        const review = new Review({
          user: userId,
          trail: trailId,
          rating,
          comment,
        });
  
        await review.save();
  
        // Optionally, add the review to the trail's reviews array
        const trail = await Trail.findOne({ id: trailId });
        if (trail) {
          trail.reviews.push(review._id);
          await trail.save();
        } else {
          // If the trail is not in the database, you might want to handle this case
        }
  
        res.json(review);
      } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Server error' });
      }
    }
  );
  // GET /api/reviews/:trailId
router.get('/:trailId', async (req, res) => {
    try {
      const { trailId } = req.params;
  
      const reviews = await Review.find({ trail: trailId }).populate('user', 'name');
  
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
// DELETE /api/reviews/:id
router.delete('/:id', auth, async (req, res) => {
    try {
      const reviewId = req.params.id;
      const userId = req.user.id;
  
      const review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      // Check if the review belongs to the user
      if (review.user.toString() !== userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      await review.remove();
  
      res.json({ message: 'Review deleted' });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router;
