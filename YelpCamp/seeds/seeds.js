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
        image: 'https://source.unsplash.com/collection/483251'
    },
    {
        author: "5fb3211b82427114c001e993",
        title: 'Camp 2',
        price: Math.floor(Math.random() * 20) + 10,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, amet!',
        location: 'Place B',
        image: 'https://source.unsplash.com/collection/483251'
    },
    {
        author: "5fb3211b82427114c001e993",
        title: 'Camp 3',
        price: Math.floor(Math.random() * 20) + 10,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, amet!',
        location: 'Place C',
        image: 'https://source.unsplash.com/collection/483251'
    }
];

const seedDB = async () => {
    await Campground.deleteMany({});
    Campground.insertMany(seedCamps)
        .then(res => (console.log(res)))
        .catch(err => (console.log(err)));
}

seedDB();