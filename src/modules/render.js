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

export { createAlert };
