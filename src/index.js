import { createAlert, createHourForecast } from "./modules/render.js";
import { getHourlyWeatherData, getWeatherData } from "./modules/weather.js";
import "./styles.css";

const locationInput = document.getElementById("location-input");
const submitButton = document.getElementById("submit-button");
let submitTime = new Date();
submitTime = (submitTime.getTime() - submitTime.getMilliseconds()) / 1000;

submitButton.addEventListener("click", () => {
  const alertsElement = document.getElementById("alerts");
  const currentTempElement = document.getElementById("current-temp");
  const currentLowElement = document.getElementById("current-low");
  const currentHighElement = document.getElementById("current-high");
  const currentFeelsLikeElement = document.getElementById("current-feels-like");
  const currentHumidityElement = document.getElementById("current-humidity");
  const currentUvElement = document.getElementById("current-uv");
  const currentConditionsElement =
    document.getElementById("current-conditions");
  const location = locationInput.value;

  getWeatherData(location, "us").then((weatherData) => {
    const currentConditions = weatherData.currentConditions;
    const todayForecast = weatherData.days[0];
    const alerts = weatherData.alerts;
    alertsElement.textContent = "";

    for (let alert of alerts) {
      alertsElement.appendChild(createAlert(alert));
    }

    currentTempElement.textContent = `${Math.round(currentConditions.temp)}°F`;
    currentConditionsElement.textContent = currentConditions.conditions;
    currentLowElement.textContent = `${Math.round(todayForecast.tempmin)}°F`;
    currentHighElement.textContent = `${Math.round(todayForecast.tempmax)}°F`;
    currentFeelsLikeElement.textContent = `Feels like ${Math.round(currentConditions.feelslike)}°F`;
    currentHumidityElement.textContent = `Humidity: ${Math.round(currentConditions.humidity)}%`;
    currentUvElement.textContent = `UV Index: ${currentConditions.uvindex}`;
  });

  getHourlyWeatherData(location, "us").then((weatherData) => {
    submitTime = weatherData.currentConditions.datetimeEpoch;
    const nextDayTime = submitTime + 60 * 60 * 24;
    const hourlyDiv = document.getElementById("hours");
    hourlyDiv.textContent = "";

    for (let i = 0; i < weatherData.days.length; i++) {
      for (let hour of weatherData.days[i].hours) {
        if (
          hour.datetimeEpoch >= submitTime &&
          hour.datetimeEpoch <= nextDayTime
        ) {
          hour.datetime = convertToTwelveHourFormat(hour.datetime);
          createHourForecast(hour);
        }
      }
    }
  });
});

function convertToTwelveHourFormat(time) {
  const timeArray = time.split(":");
  let hour = parseInt(timeArray[0]);
  const period = hour >= 12 && hour > 0 ? "PM" : "AM";

  if (period === "PM" || hour === 0) {
    if (hour != 12 && hour > 0) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }
  }

  return `${hour}${period}`;
}
