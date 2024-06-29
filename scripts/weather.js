import { fetchWeather, weatherIconMapping } from "../scripts/search_weather.js";
import { convertUnixTimestampToReadableFormat } from "../scripts/time_converter.js";

dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);

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

const weatherContainer = document.querySelector(".weather-cotainer");

const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get("city");

const data = fetchWeather(city);
data.then((data) => {
  if (data != "") {
    console.log(data[0]);
    const unixTimestamp = parseInt(data[0].dt);
    const timeZone = data[0].timezone;
    const date = convertUnixTimestampToReadableFormat(unixTimestamp, timeZone);
    const sunSet = convertUnixTimestampToReadableFormat(data[0].sys.sunset , data[0].timezone)
    const sunRise = convertUnixTimestampToReadableFormat(data[0].sys.sunrise , data[0].timezone)
    const weatherIconCode = data[0].weather[0].icon;
    const weatherIconClass = weatherIconMapping[weatherIconCode];
    let weatherHtml = `
            <div class="city-name-date">
              <h1>${data[0].name}<span>${data[0].sys.country}</span></h1>
              <p>${date[0]}</p>
          </div>
          <div class="cards-container">
              <div class="general-info-icon-icon">
                  <div class="tem-container">
                      <p>${Math.round(
                        data[0].main.temp - 273.15
                      )}<sup>o</sup>C</p>
                      <p>Cloudy</p>
                  </div>
                  <div>
                      <i class="wi ${weatherIconClass} weather-icon"></i>
                  </div>
              </div>
              <div class="humidity-wind">
                  <div class="humidity">
                      Humidity:&nbsp;<span>${data[0].main.humidity} %</span>
                  </div>
                  <div class="wind">
                      Wind:&nbsp;<span>${data[0].wind.speed} km/h</span>
                  </div>
                  <div class="wind">
                      Sunrise:&nbsp;<span>${sunRise[1]}</span>
                  </div>
                  <div class="wind">
                      Sunset:&nbsp;<span>${sunSet[1]}</span>
                  </div>
              </div>
          </div>
    `;
    weatherContainer.style.backgroundImage = backgroundImage(
      data[0].weather[0].main.toLowerCase()
    );
    weatherContainer.innerHTML = weatherHtml;
  } else {
    weatherContainer.textContent = "Weather data now found....";
    weatherContainer.style.color = "red";
  }
});

function backgroundImage(condition) {
  let imageUrl;

  switch (condition) {
    case "clear":
      imageUrl = "url(./assets/weather_images/clear.jpg)";
      break;
    case "clouds":
      imageUrl = "url(./assets/weather_images/clouds.jpg)";
      break;
    case "rain":
      imageUrl = "url(./assets/weather_images/rain.jpg)";
      break;
    case "snow":
      imageUrl = "url(./assets/weather_images/snow.jpg)";
      break;
    case "thunderstorm":
      imageUrl = "url(./assets/weather_images/thunderstorm.jpg)";
      break;
    case "drizzle":
      imageUrl = "url(./assets/weather_images/drizzle.avif)";
      break;
    case "haze":
    case "fog":
    case "mist":
      imageUrl = "url(./assets/weather_images/fog.avif)";
      break;
    default:
      imageUrl = "url(./assets/weather_images/default.avif)";
      break;
  }

  return imageUrl;
}
