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
    res.render('home', { 
        user: {name: "Rodaina", age: "21"},
        title: 'Home Page',
        });
});

//Contact Us
app.get('/contact-us', (req, res) => {
    const blogs = [
        {title: 'Telephone Number', snippet: '(+20)1234567890'},
        {title: 'Email', snippet: 'dummyname@email.com'},
        {title: 'Instagram', snippet: '@dummy_name'}
    ];
    res.render('contact', { title: 'Contact Us', blogs });
});

//Our Services
app.get('/services', (req, res) => {

    const blogs = [
        {title: 'First Service', snippet: 'Hello, this is the first service we provide'},
        {title: 'Second Service', snippet: 'Hello, this is the second service we provide'},
        {title: 'Third Service', snippet: 'Hello, this is the third service we provide'},
    ];
    res.render('services', { title: 'Our Services', blogs });

});

//404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

//-------------------------------------------------------------------------------------------------------------------

