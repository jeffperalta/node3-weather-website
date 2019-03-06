const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'..','public');
const viewDirectoryPath = path.join(__dirname,'..','templates','views');
const partialsDirectoryPath = path.join(__dirname,'..','templates','partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Jeff Peralta'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Jeff Peralta'
    });
});

app.get('/help', (req, res) => {
    console.log(req);
    res.render('help',{
        title: 'Help page',
        name: 'Jeff Peralta',
        message: '<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    });
});

app.get('/weather', (req, res) =>{
    if(!req.query.address) {
        return res.send({
            error: 'You must provide the address'
        })
    }

    const address = req.query.address;

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
          return res.send({error});
        }

        forecast(latitude, longitude, (error, forecast) =>{
            if(error) {
                return res.send({error});
            }

            const results = {
                forecast,
                location,
                address
            };
            res.send(results);
        });
      });

    
});

app.get('/help/*', (req, res) => {
    res.render('errors/404',{
        title: '404: Page Not Found',
        name: 'Jeff Peralta',
        errorMsg: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('errors/404',{
        title: '404: Page Not Found',
        name: 'Jeff Peralta',
        errorMsg: 'Page Not Found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});