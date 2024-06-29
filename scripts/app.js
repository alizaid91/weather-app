import { showCurretLocationWeatherData } from "../scripts/search_weather.js";
import {fetchWeather , weatherIconMapping } from "../scripts/search_weather.js";
import { convertUnixTimestampToReadableFormat } from "../scripts/time_converter.js";
// import './weather.js'

dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);

const weatherOfPopularPlacesIndia = document.querySelector(
  ".india-popular-places-weather"
);
const weatherOfPopularPlacesWorld = document.querySelector(
  ".world-polular-places-weather"
);

const cityBackground = [
  { cityName: "delhi", imgSrc: "./assets/city_images/delhi_gate_image.jpg" },
  { cityName: "kolkata", imgSrc: "./assets/city_images/kolkata.webp" },
  { cityName: "mumbai", imgSrc: "./assets/city_images/mumbai_cst_image.jpg" },
  { cityName: "pune", imgSrc: "./assets/city_images/pune_image.jpg" },
  { cityName: "hydrabad", imgSrc: "./assets/city_images/hydrabad_image.jpg" },
  { cityName: "banglor", imgSrc: "./assets/city_images/banglore_image.jpg" },
  { cityName: "newYork", imgSrc: "./assets/city_images/newYork_image.webp" },
  { cityName: "tokyo", imgSrc: "./assets/city_images/tokyo_image.jpg" },
  { cityName: "paris", imgSrc: "./assets/city_images/paris_image.jpg" },
];

const data = fetchWeather(
  "Delhi",
  "Kolkata",
  "Mumbai",
  "pune",
  "hyderabad",
  "bangalore",
  "New york",
  "Tokyo",
  "Paris"
);
data.then((data) => {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    const unixTimestamp = parseInt(data[i].dt);
    const timeZone = data[i].timezone
    const date = convertUnixTimestampToReadableFormat(unixTimestamp , timeZone)

    const weatherIconCode = data[i].weather[0].icon;
    const weatherIconClass = weatherIconMapping[weatherIconCode];

    let cityCard = `
              <div class="${cityBackground[i].cityName} weather-card">
                <div class="city-name-time">
                    <p>${date[0]}</p>
                    <h1>${data[i].name}</h1>
                </div>
                <div class="temp">
                    <p>${Math.round(
                      data[i].main.temp - 273.15
                    )}<sup>o</sup></p>
                    <i class="wi ${weatherIconClass} weather-icon"></i>
                </div>
                <div class="humidity-wind-container">
                    <div class="humidity">
                        Wind:
                        <span class="humidity-value" >${
                          data[i].wind.speed
                        }</span>
                        <span>
                            km/h
                        </span>
                    </div>
                    <div class="humidity">
                        Humidity:
                        <span class="humidity-value">${
                          data[i].main.humidity
                        }</span>
                        <span>
                            %
                        </span>
                    </div>
                </div>
            </div>
  `;
    if (i <= 5) {
      weatherOfPopularPlacesIndia.innerHTML += cityCard;
    } else if (i>5 && i <= 8) {
      weatherOfPopularPlacesWorld.innerHTML += cityCard;
    }
    document.querySelector(
      `.${cityBackground[i].cityName}`
    ).style.backgroundImage = `url(${cityBackground[i].imgSrc})`;
  }
});

const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", () => {
  const city = document.querySelector("#city-name").value;
  if (!city) {
    alert("Enter city name...");
  } else {
    window.location.href = `weather.html?city=${city}`;
    document.querySelector("#city-name").value = "";
  }
});

const hsh = showCurretLocationWeatherData()
hsh.then((data) => {
  console.log(data)
})

// document.addEventListener("DOMContentLoaded", () => {
//   const data = showCurretLocationWeatherData();
//   if (data) {
//     data.then((data) => {
//       console.log(data);
//       const tempratureInFer = data.main.temp;
//       const tempInCelcius = tempratureInFer - 273.15;
//       console.log(tempratureInFer);
//       console.log(tempInCelcius);
//     });
//   }
// });
