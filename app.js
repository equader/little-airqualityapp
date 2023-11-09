require('dotenv').config();
import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use(express.static('public'));


app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index'); 
});

app.post('/add-city', async (req, res) => { 
    const city = req.body.city;

    try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/airquality?city=${encodeURIComponent(city)}`, {
            headers: {'x-api-key': process.env.API_KEY} 
        });

        
        const airQualityData = response.data;

        
        res.render('airquality', { city: city, data: airQualityData });
    } catch (error) {
        console.error('Error fetching air quality data:', error);
        res.status(500).render('error', { message: 'Could not fetch air quality data' });
    }
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
