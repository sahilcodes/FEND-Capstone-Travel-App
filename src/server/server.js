require('dotenv').config();
const express = require('express')
const app = express();
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');


// Global variables
let cityData;
const weatherAPIKey = process.env.WEATHER_API_KEY;
const imgAPIKey = process.env.IMG_API_KEY;

// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// GET route
app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

// POST route, save city data
app.post('/add', (req, res) => {
  cityData = req.body;
  res.send(cityData);
});

// GET route for city data
app.get('/all', (req, res) => {
  res.send(cityData);
});

app.get('/all', async (req, res) => {

  let lat;
  let lng;
  let dateInSeconds;
  let date;

  const DARK_SKY_SECRET_KEY = '841a9888f38f0d5458c1f32b892d2d1b';
  dateInSeconds = new Date(date) / 1000;
  const callUrl = `https://api.darksky.net/forecast/${DARK_SKY_SECRET_KEY}/${lat},${lng},${dateInSeconds}`;
  res = await fetch('https://cors-anywhere.herokuapp.com/'+ callUrl);
  
  try {
      const data = await res.json();
      return data;

  } catch(err){
      console.log(err);
  }
});

// GET route for weather forecast for 16 days
// app.get('/weather/:destinationId', async (req, res) => {
//   const id = parseInt(req.params.destinationId);
//   let lat;
//   let lng;
//   let dateInSeconds;
//   let date;
//   const geonamesData = cityData.geonames;

//   for (let i = 0; i < geonamesData.length; i++) {
//     if (geonamesData[i].geonameId === id) {
//       lat = geonamesData[i].lat;
//       lng = geonamesData[i].lng;
//       dateInSeconds = new Date(date) / 1000;
//       break;
//     }
//   }
//   const apiUrl = `https://api.darksky.net/forecast/${weatherAPIKey}/${lat},${lng},${dateInSeconds}`;

//   const response = await fetch(apiUrl);
//   try {
//     const json = await response.json();
//     res.json(json);
//   } catch (err) {
//     console.log('Error: ', err);
//   }
// });

// GET route for pixabay image
app.get('/image/:destinationId', async (keyword,req, res) => {
  //replace the spaces with + sign;
  keyword = keyword.replace(/\s/g, '+');

  const apiUrl = `https://pixabay.com/api/?key=${imgAPIKey}&q=${destination}&image_type=photo&pretty=true`;

  const response = await fetch(apiUrl);
  try {
    const imgInfo = await response.json();
    res.json(imgInfo);
  } catch (err) {
    console.log('Error: ', err);
    res.json({ total: 0, totalHits: 0, hits: [] });
  }
});




app.listen(port, async () => {
   console.log('The server is runing on http://localhost:3000');
})

module.exports = app;