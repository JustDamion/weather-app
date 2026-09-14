import {
  renderHourlyForecast,
  renderAlerts,
  renderCurrentConditions,
  renderTwoWeekForecast,
  showLoading,
  hideLoading,
} from "./modules/render.js";
import { getHourlyWeatherData, getWeatherData } from "./modules/weather.js";
import "./styles.css";

const locationInput = document.getElementById("location-input");
const submitButton = document.getElementById("submit-button");
const locationTitle = document.getElementById("location-title");
const unitToggle = document.getElementById("unit-toggle");
const unitRegion = unitToggle.checked ? "metric" : "us";
const tempUnit = unitToggle.checked ? "C" : "F";
const distanceUnit = unitToggle.checked ? "km/h" : "mph";

showLoading();

getWeatherData("San Francisco, California", unitRegion).then((weatherData) => {
  hideLoading();
  locationTitle.textContent = "San Francisco, California";
  renderAlerts(weatherData.alerts);
  renderCurrentConditions(weatherData, tempUnit, distanceUnit);
  renderTwoWeekForecast(weatherData.days, tempUnit, distanceUnit);
});

getHourlyWeatherData("San Francisco, California", unitRegion).then(
  (weatherData) => {
    renderHourlyForecast(weatherData, tempUnit);
  },
);

submitButton.addEventListener("click", () => {
  showLoading();
  getWeatherData(locationInput.value, unitRegion).then((weatherData) => {
    hideLoading();
    locationTitle.textContent = locationInput.value;
    renderAlerts(weatherData.alerts);
    renderCurrentConditions(weatherData, tempUnit, distanceUnit);
    renderTwoWeekForecast(weatherData.days, tempUnit, distanceUnit);
  });

  getHourlyWeatherData(locationInput.value, unitRegion).then((weatherData) => {
    renderHourlyForecast(weatherData, tempUnit);
  });
});
