const express = require('express');
const router = express.Router();
const Review = require('../db/models/Review');
const User = require('../db/models/User')

/* mounted on /api */
router.get('/reviews', async (req, res, next) => {
  try {
    const getAllReviews = await Review.findAll({
        include: [User]
    });
    res.status(200).send(getAllReviews);
  } catch (error) {
    next(error);
  }
});

router.get('/reviews/:id', async (req, res, next) => {
  try {
    const ReviewId = req.params.id;
    const getReviewById = await Review.findByPk(ReviewId, {
        include: [User]
    }); 
    res.status(200).send(getReviewById);
  } catch (error) {
    next(error);
  }
});

module.exports = router; 