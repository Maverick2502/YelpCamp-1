const express = require('express'),
    catchAsync = require('../utils/catchAsync'),
    router = express.Router({ mergeParams: true }),
    reviews = require('../controllers/reviews'),
    { validateReview, isLoggedIn, isReviewAuthor } = require('../middlewares/middleware');

// Review Routes
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;