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
    // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))
    .post(upload.array('image'), (req, res) => {
        try {
            console.log(req.body, req.files);
            res.send('IMAGE UPLOADED');
        } catch (e) {
            console.log(e);
        }
        
    })

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))




module.exports = router;