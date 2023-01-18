const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

main()
    .then(() => {
        console.log("Database connected");
    })
    .catch(() => { })

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index');
})

app.listen(3000, () => {
    console.log('Listening...')
})
