const mongoose = require('mongoose'),
    Campground = require('../models/campground');

// Code connecting to mongodb
mongoose.connect('mongodb://localhost:27017/yelpcamp', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
.then(() => {
        console.log('Connection open!')
})
.catch(err => {
        console.log('Error in connecting...')
        console.log(err)
});   

const seedCamps = [
    {
        // Our user ID
        author: "5fb3211b82427114c001e993",
        title: 'Camp 1',
        price: Math.floor(Math.random() * 20) + 10,
        geometry: { type: 'Point', coordinates: [ -122.3301, 47.6038 ] },
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, amet!',
        location: 'Seattle, Washington',
        images: [
            {
              url: 'https://res.cloudinary.com/diko6sl68/image/upload/v1606094107/YelpCamp/f1vasnc2wdpvn5kamhm8.jpg',
              filename: 'YelpCamp/f1vasnc2wdpvn5kamhm8'
            },
            {
              url: 'https://res.cloudinary.com/diko6sl68/image/upload/v1606094107/YelpCamp/zpvqwchty06aaiiqg0fg.jpg',
              filename: 'YelpCamp/zpvqwchty06aaiiqg0fg'
            }
          ]
    },
    {
        author: "5fb3211b82427114c001e993",
        title: 'Camp 2',
        price: Math.floor(Math.random() * 20) + 10,
        geometry: { type: 'Point', coordinates: [ -110.3626, 46.8797 ] },
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, amet!',
        location: 'Orlando, Montana',
        images: [
            {
              url: 'https://res.cloudinary.com/diko6sl68/image/upload/v1606094107/YelpCamp/f1vasnc2wdpvn5kamhm8.jpg',
              filename: 'YelpCamp/f1vasnc2wdpvn5kamhm8'
            },
            {
              url: 'https://res.cloudinary.com/diko6sl68/image/upload/v1606094107/YelpCamp/zpvqwchty06aaiiqg0fg.jpg',
              filename: 'YelpCamp/zpvqwchty06aaiiqg0fg'
            }
          ]    },
    {
        author: "5fb3211b82427114c001e993",
        title: 'Camp 3',
        price: Math.floor(Math.random() * 20) + 10,
        geometry: { type: 'Point', coordinates: [ 144.9631, -37.8136 ] },
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, amet!',
        location: 'Melbourne, Victoria',
        images: [
            {
              url: 'https://res.cloudinary.com/diko6sl68/image/upload/v1606094107/YelpCamp/f1vasnc2wdpvn5kamhm8.jpg',
              filename: 'YelpCamp/f1vasnc2wdpvn5kamhm8'
            },
            {
              url: 'https://res.cloudinary.com/diko6sl68/image/upload/v1606094107/YelpCamp/zpvqwchty06aaiiqg0fg.jpg',
              filename: 'YelpCamp/zpvqwchty06aaiiqg0fg'
            }
          ]    }
];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++ ) {
      Campground.insertMany(seedCamps)
        .then(res => (console.log(res)))
        .catch(err => (console.log(err)));
    }
}

seedDB();