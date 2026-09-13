import {
  createAlert,
  createDayForecast,
  createHourForecast,
} from "./modules/render.js";
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
  const currentWindElement = document.getElementById("current-wind");
  const currentPrecipitationChance = document.getElementById(
    "current-precipitation-chance",
  );
  const currentSunsetElement = document.getElementById("current-sunset-time");
  const currentConditionsElement =
    document.getElementById("current-conditions");
  const location = locationInput.value;
  const forecastDiv = document.getElementById("forecast-days");

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
    currentFeelsLikeElement.textContent = `${Math.round(currentConditions.feelslike)}°F`;
    currentHumidityElement.textContent = `${Math.round(currentConditions.humidity)}%`;
    currentUvElement.textContent = `${currentConditions.uvindex}`;
    currentWindElement.textContent = `${Math.round(currentConditions.windspeed)} mph`;
    currentPrecipitationChance.textContent = `${Math.round(currentConditions.precipprob)}%`;
    currentSunsetElement.textContent = convertToTwelveHourFormat(
      currentConditions.sunset,
      true,
    );

    forecastDiv.textContent = "";
    for (let i = 1; i < weatherData.days.length; i++) {
      createDayForecast(weatherData.days[i]);
    }
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
          hour.datetime = convertToTwelveHourFormat(hour.datetime, false);
          createHourForecast(hour);
        }
      }
    }
  });
});

function convertToTwelveHourFormat(time, includeMinutes) {
  const timeArray = time.split(":");
  let hour = parseInt(timeArray[0]);
  const minutes = timeArray[1];
  const period = hour >= 12 && hour > 0 ? "PM" : "AM";

  if (period === "PM" || hour === 0) {
    if (hour != 12 && hour > 0) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }
  }

  const formattedTime = includeMinutes
    ? `${hour}:${minutes}${period}`
    : `${hour}${period}`;
  return formattedTime;
}
