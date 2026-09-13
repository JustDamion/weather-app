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

function createHourForecast(hour) {
  const hourlyDiv = document.getElementById("hours");

  const hourDiv = document.createElement("div");
  hourDiv.setAttribute("class", "hour");

  const temp = document.createElement("p");
  temp.setAttribute("class", "hour__temp");
  temp.textContent = `${Math.round(hour.temp)}°F`;

  const time = document.createElement("p");
  time.setAttribute("class", "hour__time");
  time.textContent = hour.datetime;

  hourDiv.appendChild(temp);
  hourDiv.appendChild(time);

  hourlyDiv.appendChild(hourDiv);
}

export { createAlert, createHourForecast };
