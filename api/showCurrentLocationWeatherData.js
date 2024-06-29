// api/showCurrentLocationWeatherData.js

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { latitude, longitude } = req.body;
    const API_KEY = process.env.API_KEY;

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }

        const info = await response.json();
        res.status(200).json(info);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};
