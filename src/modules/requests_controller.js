const requestsController = (() => {
  async function getWeatherByLocation(keyword) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${keyword}&APPID=f501bae5a6ace260330d16f409ec0a35`,
        { mode: 'cors' }
      );
      const data = await response.json();
      const forecast = {
        location: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        icon_url: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        temperature: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        min: data.main.temp_min,
        max: data.main.temp_max,
        wind: data.wind.speed,
        cloudiness: data.clouds.all,
        visibility: data.visibility,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
      };
      console.log(forecast);
    } catch (error) {
      console.log(error);
    }
  }

  return { getWeatherByLocation };
})();

export default requestsController;
