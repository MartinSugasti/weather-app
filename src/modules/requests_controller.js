const requestsController = (() => {
  function Forecast(data) {
    this.location = data.name;
    this.country = data.sys.country;
    this.main = data.weather[0].main;
    this.description = data.weather[0].description;
    this.icon_url = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    this.temperature = data.main.temp;
    this.feels_like = data.main.feels_like;
    this.humidity = data.main.humidity;
    this.min = data.main.temp_min;
    this.max = data.main.temp_max;
    this.wind = data.wind.speed;
    this.cloudiness = data.clouds.all;
    this.visibility = data.visibility;
    this.sunrise = data.sys.sunrise;
    this.sunset = data.sys.sunset;
  }

  async function getWeatherByLocation(keyword) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${keyword}&APPID=f501bae5a6ace260330d16f409ec0a35`,
        { mode: 'cors' }
      );

      if (response.ok) {
        const data = await response.json();
        return new Forecast(data);
      }

      if (response.status === 404) {
        throw new Error('Location not found!');
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
