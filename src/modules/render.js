const WEEKDAY = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function createAlert(alert) {
  const alertDiv = document.createElement("div");
  alertDiv.setAttribute("class", "alert");

  const event = document.createElement("h3");
  event.setAttribute("class", "alert__event");
  event.textContent = alert.event;

  const headline = document.createElement("h4");
  headline.setAttribute("class", "alert__headline");
  headline.textContent = alert.headline;

  const description = document.createElement("p");
  description.setAttribute("class", "alert__description");
  description.textContent = alert.description;

  alertDiv.appendChild(event);
  alertDiv.appendChild(headline);
  alertDiv.appendChild(description);

  return alertDiv;
}

function createDayForecast(day, tempUnit, distanceUnit) {
  const forecastTableBody = document.getElementById("forecast-days");

  const dayRow = document.createElement("tr");
  dayRow.setAttribute("class", "day");

  const date = new Date(day.datetime);
  const weekDay = WEEKDAY[date.getDay()];
  const name = document.createElement("td");
  name.setAttribute("class", "day__week-day");
  name.textContent = weekDay;

  const conditions = document.createElement("td");
  conditions.setAttribute("class", "day__conditions");
  conditions.textContent = day.conditions;

  const humidity = document.createElement("td");
  humidity.setAttribute("class", "day__humidity");
  humidity.textContent = `${Math.round(day.humidity)}%`;

  const precipitationChance = document.createElement("td");
  precipitationChance.setAttribute("class", "day__precipitation");
  precipitationChance.textContent = `${day.precipprob}%`;

  const windSpeed = document.createElement("td");
  windSpeed.setAttribute("class", "day__wind");
  windSpeed.textContent = `${Math.round(day.windspeed)} ${distanceUnit}`;

  const low = document.createElement("td");
  low.setAttribute("class", "day__low");
  low.textContent = `↓ ${Math.round(day.tempmin)}°${tempUnit}`;

  const high = document.createElement("td");
  high.setAttribute("class", "day__high");
  high.textContent = `↑ ${Math.round(day.tempmax)}°${tempUnit}`;

  dayRow.appendChild(name);
  dayRow.appendChild(conditions);
  dayRow.appendChild(humidity);
  dayRow.appendChild(precipitationChance);
  dayRow.appendChild(windSpeed);
  dayRow.appendChild(low);
  dayRow.appendChild(high);

  forecastTableBody.appendChild(dayRow);
}

function createHourForecast(hour, unit) {
  const hourlyDiv = document.getElementById("hours");

  const hourDiv = document.createElement("div");
  hourDiv.setAttribute("class", "hour");

  const temp = document.createElement("p");
  temp.setAttribute("class", "hour__temp");
  temp.textContent = `${Math.round(hour.temp)}°${unit}`;

  const time = document.createElement("p");
  time.setAttribute("class", "hour__time");
  time.textContent = hour.datetime;

  hourDiv.appendChild(time);
  hourDiv.appendChild(temp);

  hourlyDiv.appendChild(hourDiv);
}

export { createAlert, createDayForecast, createHourForecast };
