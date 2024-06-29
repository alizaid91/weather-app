// Function to fetch weather by city name
export async function fetchWeather(...cities) {
  try {
      const response = await fetch('/api/fetchWeather', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cities }),
      });
      if (!response.ok) {
          throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("An error occurred:", error);
      return { error: error.message };
  }
}

// Function to fetch weather by user location
export async function showCurretLocationWeatherData() {
  try {
      const userLocation = await getUserLocation();
      const response = await fetch('/api/showCurrentLocationWeatherData', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude
          }),
      });
      if (!response.ok) {
          throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
      const info = await response.json();
      return info;
  } catch (error) {
      console.error("An error occurred:", error);
      return { error: error.message };
  }
}

async function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
  }

export const weatherIconMapping = {
  "01d": "wi-day-sunny",
  "01n": "wi-night-clear",
  "02d": "wi-day-cloudy",
  "02n": "wi-night-alt-cloudy",
  "03d": "wi-cloud",
  "03n": "wi-cloud",
  "04d": "wi-cloudy",
  "04n": "wi-cloudy",
  "09d": "wi-showers",
  "09n": "wi-showers",
  "10d": "wi-day-rain",
  "10n": "wi-night-alt-rain",
  "11d": "wi-thunderstorm",
  "11n": "wi-thunderstorm",
  "13d": "wi-snow",
  "13n": "wi-snow",
  "50d": "wi-fog",
  "50n": "wi-fog",
};
