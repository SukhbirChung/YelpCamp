const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

function sample(array) {
    return array[Math.floor(Math.random() * array.length)]
}

main()
    .then(async () => {
        console.log("Database connected");
        await Campground.deleteMany({});
        for (let i = 1; i <= 50; i++) {
            const random1000 = Math.floor(Math.random() * 1000);
            const camp = new Campground({
                title: `${sample(descriptors)} ${sample(places)}`,
                location: cities[random1000].city + ", " + cities[random1000 - 1].state
            })
            await camp.save();
            mongoose.connection.close();
        }        
    })
    .catch(() => { })

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}
