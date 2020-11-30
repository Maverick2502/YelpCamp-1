const mongoose = require('mongoose'),
    Review = require('./review'),
    Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: String,
    filename: String
})

imageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
}) // Virtual property that preps our image URL to show 200px images

const campgroundSchema = new Schema({
    title: String,
    images: [imageSchema],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

// Middleware that runs after findByIdAndDelete() method is called for Campground documents
campgroundSchema.post('findOneAndDelete', async function (campground) {
    if(campground.reviews.length) {
       const res = await Review.deleteMany({ _id: { $in: campground.reviews }}) // Deletes all reviews that are associated with the deleted campground
   }
  })

module.exports = mongoose.model('Campground', campgroundSchema);