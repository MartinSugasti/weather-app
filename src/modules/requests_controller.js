const requestsController = (() => {
  function Forecast(data) {
    this.location = data.name;
    this.country = data.sys.country;
    this.timezone = data.timezone;
    this.main = data.weather[0].main;
    this.description = data.weather[0].description;
    this.iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    this.temperature = data.main.temp;
    this.feelsLike = data.main.feels_like;
    this.sunrise = data.sys.sunrise;
    this.sunset = data.sys.sunset;
    this.minTemperature = data.main.temp_min;
    this.maxTemperature = data.main.temp_max;
    this.wind = data.wind.speed;
    this.humidity = data.main.humidity;
    this.cloudiness = data.clouds.all;
    this.visibility = data.visibility;
  }

  async function getWeatherByLocation(keyword, unitSystem) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${keyword}&units=${unitSystem}&APPID=f501bae5a6ace260330d16f409ec0a35`,
        { mode: 'cors' }
      );

      if (response.ok) {
        const data = await response.json();
        return new Forecast(data);
      }

      if (response.status === 404) {
        throw new Error('404');
      } else {
        throw new Error('Something went wrong with your request!');
      }
    } catch (error) {
      return error;
    }
  }

  return { getWeatherByLocation };
})();

export default requestsController;
