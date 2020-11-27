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
        author: "5fb3211b82427114c001e993",
        title: 'Camp 1',
        price: Math.floor(Math.random() * 20) + 10,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, amet!',
        location: 'Place A',
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
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, amet!',
        location: 'Place B',
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
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, amet!',
        location: 'Place C',
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
    Campground.insertMany(seedCamps)
        .then(res => (console.log(res)))
        .catch(err => (console.log(err)));
}

seedDB();