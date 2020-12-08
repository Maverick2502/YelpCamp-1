// Middleware file
const Campground = require('../models/campground'),
    Review = require('../models/review'),
    { campgroundSchema, reviewSchema } = require('../schemas'),
    ExpressError = require('../utils/ExpressError');

// Middleware to check if user is logged in before accessing route that requires authorization
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; // Store URL that user is originally requesting before logging in
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

// Middleware authenticating user before doing CRUD operations on campgrounds
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) { // If logged in user's ID != campground's author ID, don't allow update
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

// Middleware authenticating user before doing CRUD operations on reviews
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) { // If logged in user's ID != review's author ID, don't allow update
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}


// JOI validation middleware for Campground
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

// JOI validation middleware for Review
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}
