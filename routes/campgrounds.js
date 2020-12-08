const express = require('express'),
    catchAsync = require('../utils/catchAsync'),
    campgrounds = require('../controllers/campgrounds'),
    multer = require('multer'),
    { storage } = require('../cloudinary/index'),
    upload = multer({ storage }), // Set upload destination for images to be our cloud storage   
    router = express.Router(),
    { isLoggedIn, isAuthor, validateCampground } = require('../middlewares/middleware');

// Campground Routes
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('images'), validateCampground, catchAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('images'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))




module.exports = router;