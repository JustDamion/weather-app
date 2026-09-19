async function getWeatherData(location, unit) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&elements=remove%3Adew%2Cremove%3Afeelslikemax%2Cremove%3Afeelslikemin%2Cremove%3Aprecipcover%2Cremove%3Apressure%2Cremove%3Asolarenergy%2Cremove%3Asolarradiation%2Cremove%3Asource%2Cremove%3Astations%2Cremove%3Avisibility%2Cremove%3Awinddir%2Cremove%3Awindgust&key=FNCLGDQZM7U2Y2ZUVNWY7DKJX&contentType=json`,
    );
    const forecast = response.json();

    return forecast;
  } catch (error) {
    console.error(error);
  }
}

async function getHourlyWeatherData(location, unit) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next24hours?unitGroup=${unit}&elements=conditions%2Cdatetime%2CdatetimeEpoch%2Cdescription%2Cfeelslike%2Cicon%2Cmoonphase%2Cname%2Coffset%2Cprecipprob%2Csource%2Cstations%2Csunrise%2CsunriseEpoch%2Csunset%2CsunsetEpoch%2Ctemp%2Cwindspeed&key=FNCLGDQZM7U2Y2ZUVNWY7DKJX&contentType=json`,
    );
    const forecast = response.json();

    return forecast;
  } catch (error) {
    console.error(error);
  }
}

async function getWeatherIcon(iconId) {
  return await import(`../images/icons/${iconId}.js`);
}

export { getHourlyWeatherData, getWeatherData, getWeatherIcon };
