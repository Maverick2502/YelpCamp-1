const Campground = require('../models/campground'),
cloudinary = require('cloudinary').v2;

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename })); // Iterate through req.files with map() to set campground.images values
    campground.author = req.user._id; // Set author field as the user id of the currently logged in user
    await campground.save();
    console.log(campground);
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
        .populate({ path: 'reviews', // Populates all review on selected campground
                    populate: {
                        path: 'author' // Populates all the authors for each review
                    } })
        .populate('author');
    if (!campground) {
        req.flash('error', 'Cannot find campground!');
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Cannot find campground!');
        res.redirect('/login');
    }
    res.render(`campgrounds/edit`, { campground });
}

module.exports.updateCampground = async (req, res, next) => {
    const { id } = req.params;  
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
    if (req.files.length > 0) {
        const imgs = req.files.map(f => ({url: f.path, filename: f.filename}))
        campground.images.push(...imgs);
      }
      await campground.save();
      if (req.body.deleteImages) {
        await campground.updateOne({ $pull: { filename: { $in: req.body.deleteImages } } });
        console.log(req.body.deleteImages);
        console.log(campground)
      }
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) { // If logged in user's ID != campground's author ID, don't allow update
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
}