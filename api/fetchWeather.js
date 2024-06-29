// api/fetchWeather.js

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { cities } = req.body;
    const API_KEY = process.env.API_KEY;

    try {
        const fetchWeatherDataForCity = async (city) => {
            const response = await fetch(
                `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
            );
            if (!response.ok) {
                throw new Error(`Failed to fetch weather data for ${city}`);
            }
            return response.json();
        };

        const weatherDataPromises = cities.map((city) =>
            fetchWeatherDataForCity(city)
        );
        const responses = await Promise.all(weatherDataPromises);

        res.status(200).json(responses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};
