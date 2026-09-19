import { convertToTwelveHourFormat, createHtmlElement } from './util.js';
import {
  getHourlyWeatherData,
  getWeatherData,
  getWeatherIcon,
} from './weather.js';

const WEEKDAY = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function showLoading() {
  const loading = document.getElementById('loading');
  loading.classList.remove('hide');
  loading.classList.add('show');
}

function hideLoading() {
  const loading = document.getElementById('loading');
  loading.classList.remove('show');
  loading.classList.add('hide');
}

function renderCurrentConditions(weatherData, tempUnit, distanceUnit) {
  const currentConditions = weatherData.currentConditions;
  const todayForecast = weatherData.days[0];

  const currentMainDiv = document.getElementById('current-main');
  const currentHighDiv = document.getElementById('current-high');
  const currentLowDiv = document.getElementById('current-low');
  const currentFeelsLikeDiv = document.getElementById('current-feels-like');
  const currentHumidityDiv = document.getElementById('current-humidity');
  const currentUvDiv = document.getElementById('current-uv');
  const currentWindDiv = document.getElementById('current-wind');
  const currentPrecipitationDiv = document.getElementById(
    'current-precipitation',
  );
  const currentSunsetDiv = document.getElementById('current-sunset');

  const high = createHtmlElement(
    'p',
    'current-high__temp',
    `${Math.round(todayForecast.tempmax)}°${tempUnit}`,
  );
  const low = createHtmlElement(
    'p',
    'current-low__temp',
    `${Math.round(todayForecast.tempmin)}°${tempUnit}`,
  );
  const temp = createHtmlElement(
    'h3',
    'current-main__temp',
    `${Math.round(currentConditions.temp)}°${tempUnit}`,
  );
  const conditions = createHtmlElement(
    'p',
    'current-main__conditions',
    currentConditions.conditions,
  );
  const feelsLike = createHtmlElement(
    'p',
    'feels-like__temp',
    `${Math.round(currentConditions.feelslike)}°${tempUnit}`,
  );
  const humidity = createHtmlElement(
    'p',
    'humidity__percent',
    `${Math.round(currentConditions.humidity)}%`,
  );
  const uv = createHtmlElement(
    'p',
    'uv__measure',
    `${currentConditions.uvindex}`,
  );
  const windSpeed = createHtmlElement(
    'p',
    'wind__speed',
    `${Math.round(currentConditions.windspeed)} ${distanceUnit}`,
  );
  const precipitationChance = createHtmlElement(
    'p',
    'precipitation__chance',
    `${Math.round(currentConditions.precipprob) || 0}%`,
  );
  const sunsetTime = createHtmlElement(
    'p',
    'sunset__time',
    convertToTwelveHourFormat(currentConditions.sunset, true),
  );

  currentHighDiv.appendChild(high);
  currentLowDiv.appendChild(low);
  currentMainDiv.appendChild(temp);
  currentMainDiv.appendChild(conditions);
  currentFeelsLikeDiv.appendChild(feelsLike);
  currentHumidityDiv.appendChild(humidity);
  currentUvDiv.appendChild(uv);
  currentWindDiv.appendChild(windSpeed);
  currentPrecipitationDiv.appendChild(precipitationChance);
  currentSunsetDiv.appendChild(sunsetTime);
}

function renderAlerts(alerts) {
  const alertsElement = document.getElementById('alerts');
  alertsElement.textContent = '';

  for (const alert of alerts) {
    const alertDiv = createHtmlElement('div', 'alert');
    const event = createHtmlElement('h3', 'alert__event', alert.event);
    const headline = createHtmlElement('h4', 'alert__headline', alert.headline);
    const description = createHtmlElement(
      'p',
      'alert__description',
      alert.description,
    );

    alertDiv.appendChild(event);
    alertDiv.appendChild(headline);
    alertDiv.appendChild(description);

    alertsElement.appendChild(alertDiv);
  }
}

function renderTwoWeekForecast(days, tempUnit, distanceUnit) {
  const forecastTableBody = document.getElementById('forecast-days');
  forecastTableBody.textContent = '';

  for (let i = 1; i < days.length; i++) {
    const date = new Date(days[i].datetime);
    const weekDay = WEEKDAY[date.getDay()];

    const dayRow = createHtmlElement('tr', 'day');
    const name = createHtmlElement('td', 'day__week-day', weekDay);
    const conditions = createHtmlElement(
      'td',
      'day__conditions',
      days[i].conditions,
    );
    const humidity = createHtmlElement(
      'td',
      'day__humidity',
      `${Math.round(days[i].humidity)}%`,
    );
    const precipitationChance = createHtmlElement(
      'td',
      'day__precipitation',
      `${days[i].precipprob || 0}%`,
    );
    const windSpeed = createHtmlElement(
      'td',
      'day__wind',
      `${Math.round(days[i].windspeed)} ${distanceUnit}`,
    );
    const low = createHtmlElement(
      'td',
      'day__low',
      `↓ ${Math.round(days[i].tempmin)}°${tempUnit}`,
    );
    const high = createHtmlElement(
      'td',
      'day__high',
      `↑ ${Math.round(days[i].tempmax)}°${tempUnit}`,
    );

    dayRow.appendChild(name);
    dayRow.appendChild(conditions);
    dayRow.appendChild(humidity);
    dayRow.appendChild(precipitationChance);
    dayRow.appendChild(windSpeed);
    dayRow.appendChild(low);
    dayRow.appendChild(high);

    forecastTableBody.appendChild(dayRow);
  }
}

async function renderHourlyForecast(weatherData, tempUnit) {
  const submitTime = weatherData.currentConditions.datetimeEpoch;
  const nextDayTime = submitTime + 60 * 60 * 24;

  const hourlyDiv = document.getElementById('hours');
  hourlyDiv.textContent = '';

  for (let i = 0; i < weatherData.days.length; i++) {
    for (const hour of weatherData.days[i].hours) {
      if (
        hour.datetimeEpoch >= submitTime &&
        hour.datetimeEpoch <= nextDayTime
      ) {
        hour.datetime = convertToTwelveHourFormat(hour.datetime, false);

        const hourDiv = createHtmlElement('div', 'hour');
        const temp = createHtmlElement(
          'p',
          'hour__temp',
          `${Math.round(hour.temp)}°${tempUnit}`,
        );
        const time = createHtmlElement('p', 'hour__time', hour.datetime);
        const weatherIcon = await getWeatherIcon(hour.icon);

        hourDiv.appendChild(time);
        hourDiv.appendChild(weatherIcon.default.cloneNode(true));
        hourDiv.appendChild(temp);

        hourlyDiv.appendChild(hourDiv);
      }
    }
  }
}

function render(location, unitRegion, tempUnit, distanceUnit) {
  const locationTitle = document.getElementById('location-title');

  showLoading();
  getWeatherData(location, unitRegion).then((weatherData) => {
    hideLoading();
    const locationDiv = document.getElementById('location');
    locationDiv.appendChild(
      createHtmlElement('h1', 'location__title', location),
    );
    locationTitle.textContent = location;
    renderAlerts(weatherData.alerts);
    renderCurrentConditions(weatherData, tempUnit, distanceUnit);
    renderTwoWeekForecast(weatherData.days, tempUnit, distanceUnit);
  });

  getHourlyWeatherData(location, unitRegion).then((weatherData) => {
    renderHourlyForecast(weatherData, tempUnit);
  });
}

export { render };
