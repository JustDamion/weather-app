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
  const currentFeelsLikeDiv = document.getElementById('current-feels-like');
  const currentHumidityDiv = document.getElementById('current-humidity');
  const currentUvDiv = document.getElementById('current-uv');
  const currentWindDiv = document.getElementById('current-wind');
  const currentPrecipitationDiv = document.getElementById(
    'current-precipitation',
  );
  const currentSunsetDiv = document.getElementById('current-sunset');

  currentMainDiv.textContent = '';
  currentFeelsLikeDiv.textContent = '';
  currentHumidityDiv.textContent = '';
  currentUvDiv.textContent = '';
  currentWindDiv.textContent = '';
  currentPrecipitationDiv.textContent = '';
  currentSunsetDiv.textContent = '';

  const range = createHtmlElement('div', 'current-range');
  const highDiv = createHtmlElement('div', 'current-high');
  const lowDiv = createHtmlElement('div', 'current-low');

  highDiv.appendChild(createHtmlElement('span', 'current-high__arrow', '↑'));
  highDiv.appendChild(
    createHtmlElement(
      'p',
      'current-high__temp',
      `${Math.round(todayForecast.tempmax)}°${tempUnit}`,
    ),
  );

  lowDiv.appendChild(createHtmlElement('span', 'current-low__arrow', '↓'));
  lowDiv.appendChild(
    createHtmlElement(
      'p',
      'current-low__temp',
      `${Math.round(todayForecast.tempmin)}°${tempUnit}`,
    ),
  );

  range.appendChild(highDiv);
  range.appendChild(lowDiv);
  currentMainDiv.appendChild(range);

  currentMainDiv.appendChild(
    createHtmlElement(
      'h3',
      'current-main__temp',
      `${Math.round(currentConditions.temp)}°${tempUnit}`,
    ),
  );
  currentMainDiv.appendChild(
    createHtmlElement(
      'p',
      'current-main__conditions',
      currentConditions.conditions,
    ),
  );

  currentFeelsLikeDiv.appendChild(
    createHtmlElement('h3', 'feels-like__title', 'Feels like'),
  );
  currentFeelsLikeDiv.appendChild(
    createHtmlElement(
      'p',
      'feels-like__temp',
      `${Math.round(currentConditions.feelslike)}°${tempUnit}`,
    ),
  );

  currentHumidityDiv.appendChild(
    createHtmlElement('h3', 'humidity__title', 'Humidity'),
  );
  currentHumidityDiv.appendChild(
    createHtmlElement(
      'p',
      'humidity__percent',
      `${Math.round(currentConditions.humidity)}%`,
    ),
  );

  currentUvDiv.appendChild(createHtmlElement('h3', 'uv__title', 'UV Index'));
  currentUvDiv.appendChild(
    createHtmlElement('p', 'uv__measure', `${currentConditions.uvindex}`),
  );

  currentWindDiv.appendChild(
    createHtmlElement('h3', 'wind__title', 'Wind Speed'),
  );
  currentWindDiv.appendChild(
    createHtmlElement(
      'p',
      'wind__speed',
      `${Math.round(currentConditions.windspeed)} ${distanceUnit}`,
    ),
  );

  currentPrecipitationDiv.appendChild(
    createHtmlElement('h3', 'precipitation__title', 'Precipitation Chance'),
  );
  currentPrecipitationDiv.appendChild(
    createHtmlElement(
      'p',
      'precipitation__chance',
      `${Math.round(currentConditions.precipprob) || 0}%`,
    ),
  );

  currentSunsetDiv.appendChild(
    createHtmlElement('h3', 'sunset__title', 'Sunset'),
  );
  currentSunsetDiv.appendChild(
    createHtmlElement(
      'p',
      'sunset__time',
      convertToTwelveHourFormat(currentConditions.sunset, true),
    ),
  );
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
  showLoading();
  getWeatherData(location, unitRegion).then((weatherData) => {
    hideLoading();
    const locationDiv = document.getElementById('location');
    locationDiv.textContent = '';
    locationDiv.appendChild(
      createHtmlElement('h1', 'location__title', location),
    );
    renderAlerts(weatherData.alerts);
    renderCurrentConditions(weatherData, tempUnit, distanceUnit);
    renderTwoWeekForecast(weatherData.days, tempUnit, distanceUnit);
  });

  getHourlyWeatherData(location, unitRegion).then((weatherData) => {
    renderHourlyForecast(weatherData, tempUnit);
  });
}

export { render };
