async function getWeatherData(zipcode, unit) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zipcode}?unitGroup=${unit}&elements=remove%3Adew%2Cremove%3Afeelslikemax%2Cremove%3Afeelslikemin%2Cremove%3Aprecipcover%2Cremove%3Apressure%2Cremove%3Asolarenergy%2Cremove%3Asolarradiation%2Cremove%3Asource%2Cremove%3Astations%2Cremove%3Avisibility%2Cremove%3Awinddir%2Cremove%3Awindgust&key=FNCLGDQZM7U2Y2ZUVNWY7DKJX&contentType=json`,
    );
    const forecast = response.json();

    return forecast;
  } catch (error) {
    console.error(error);
  }
}

export { getWeatherData };
