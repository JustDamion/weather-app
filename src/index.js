import { createAlert } from "./modules/render.js";
import { getWeatherData } from "./modules/weather.js";
import "./styles.css";

const zipcodeInput = document.getElementById("zipcode-input");
const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", () => {
  const alertsElement = document.getElementById("alerts");
  const currentTempElement = document.getElementById("current-temp");
  const currentLowElement = document.getElementById("current-low");
  const currentHighElement = document.getElementById("current-high");
  const currentFeelsLikeElement = document.getElementById("current-feels-like");
  const currentHumidityElement = document.getElementById("current-humidity");
  const currentUvElement = document.getElementById("current-uv");
  const zipcode = zipcodeInput.value;

  getWeatherData(zipcode, "us").then((weatherData) => {
    console.log(weatherData);
    const currentConditions = weatherData.currentConditions;
    const todayForecast = weatherData.days[0];
    const alerts = weatherData.alerts;
    alertsElement.textContent = "";

    for (let alert of alerts) {
      alertsElement.appendChild(createAlert(alert));
    }

    currentTempElement.textContent = `${currentConditions.temp}°F`;
    currentLowElement.textContent = `L:${todayForecast.tempmin}°F`;
    currentHighElement.textContent = `H:${todayForecast.tempmax}°F`;
    currentFeelsLikeElement.textContent = `Feels like ${currentConditions.feelslike}°F`;
    currentHumidityElement.textContent = `Humidity: ${currentConditions.humidity}%`;
    currentUvElement.textContent = `UV Index: ${currentConditions.uvindex}`;
  });
});
