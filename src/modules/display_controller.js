import requestsController from './requests_controller';

const displayController = (() => {
  function addSearchFunctionality() {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const location = document.querySelector('input').value;

      const forecast = await requestsController.getWeatherByLocation(location);
      console.log(forecast);
    });
  }

  return { addSearchFunctionality };
})();

export default displayController;
