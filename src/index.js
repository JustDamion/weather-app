import {
  renderHourlyForecast,
  renderAlerts,
  renderCurrentConditions,
  renderTwoWeekForecast,
} from "./modules/render.js";
import { getHourlyWeatherData, getWeatherData } from "./modules/weather.js";
import "./styles.css";

const locationInput = document.getElementById("location-input");
const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", () => {
  const unitToggle = document.getElementById("unit-toggle");
  const location = locationInput.value;
  const unitRegion = unitToggle.checked ? "metric" : "us";
  const tempUnit = unitToggle.checked ? "C" : "F";
  const distanceUnit = unitToggle.checked ? "km/h" : "mph";

  getWeatherData(location, unitRegion).then((weatherData) => {
    renderAlerts(weatherData.alerts);
    renderCurrentConditions(weatherData, tempUnit, distanceUnit);
    renderTwoWeekForecast(weatherData.days, tempUnit, distanceUnit);
  });

  getHourlyWeatherData(location, unitRegion).then((weatherData) => {
    renderHourlyForecast(weatherData, tempUnit);
  });
});
