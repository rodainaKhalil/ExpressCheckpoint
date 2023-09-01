const express = require('express');
const morgan = require('morgan');

//express app
const app = express();

//listen for requests
app.listen(3000);

//setting view
app.set('view engine', 'pug');

//-------------------------------------------------------------------------------------------------------------------

//Middleware
app.use((req, res, next) => {
    console.log('-------------------------------------');
    console.log('New request made: ');
    console.log('Host: ', req.hostname);
    console.log('Path: ', req.path);
    console.log('Method: ', req.method);
    next();
});

app.use((req, res, next) => {
    console.log('In the next middleware');
    next();
});

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

//-------------------------------------------------------------------------------------------------------------------

//Home Page
app.get('/', (req, res) => {
    const blogs = [
        {title: 'First Blog', snippet: 'Hello world, this is the first blog'},
        {title: 'Second Blog', snippet: 'Hello world, this is  the second blog'},
        {title: 'Third Blog', snippet: 'Hello world, this is the third blog'},
    ];
    res.render('home', { 
        title: 'Home Page', 
        user: {name: "Rodaina", age: "21"},
        blogs });
});

//Contact Us
app.get('/contact-us', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

//Our Services
app.get('/services', (req, res) => {
    res.render('services', { title: 'Our Services'});
});

//404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

//-------------------------------------------------------------------------------------------------------------------

