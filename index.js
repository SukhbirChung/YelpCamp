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
app.use(express.urlencoded({ extended: true })); 

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', { campground });
})

app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', { campground });
})

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`campgrounds/${campground._id}`);
})

app.listen(3000, () => {
    console.log('Listening...')
})
