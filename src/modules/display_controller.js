import requestsController from './requests_controller';
import sunriseIcon from '../images/sunrise.svg';
import sunsetIcon from '../images/sunset.svg';
import minTemperatureIcon from '../images/min-temperature.svg';
import maxTemperatureIcon from '../images/max-temperature.svg';
import windIcon from '../images/wind.svg';
import humidityIcon from '../images/humidity.svg';
import cloudinessIcon from '../images/cloudiness.svg';
import visibilityIcon from '../images/visibility.svg';

const displayController = (() => {
  let unitSystem = 'metric';

  const systemSymbolMapping = {
    imperial: '°F',
    metric: '°C',
  };

  function addUnitFunctionality() {
    document.querySelectorAll('.unit-radio-buttons').forEach((input) => {
      input.addEventListener('change', (event) => {
        if (event.target.value === 'celsius') {
          unitSystem = 'metric';
        } else {
          unitSystem = 'imperial';
        }
      });
    });
  }

  function showPropertyInfo(container, value, unit, image) {
    const div = document.createElement('div');
    div.classList.add('info-detail', 'col-6', 'col-sm-3', 'col-md-1', 'mx-md-1', 'px-0');
    container.appendChild(div);

    const icon = new Image();
    icon.src = image;
    div.appendChild(icon);

    const p = document.createElement('p');
    div.appendChild(p);
    const small = document.createElement('small');
    p.innerHTML = `${value}${unit}`;
    p.appendChild(small);
  }

  function timeFromUnixUTC(timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const date = new Date(timestamp * 1000);

    // Hours part from the timestamp
    const hours = date.getHours();

    // Minutes part from the timestamp
    const minutes = `0${date.getMinutes()}`;

    // Will display time in 10:30:23 format
    const formattedTime = `${hours}:${minutes.substr(-2)}`;

    return formattedTime;
  }

  function showForecast(data) {
    const card = document.createElement('div');
    card.innerHTML = '';
    card.classList.add(
      'card',
      'text-center',
      'w-75',
      'text-light',
      'border',
      'border-0',
      'card-background',
      `${data.main.toLowerCase()}`
    );

    const locationDiv = document.createElement('div');
    locationDiv.classList.add('mt-4');
    card.appendChild(locationDiv);

    const locationHeader = document.createElement('h1');
    locationHeader.classList.add('mb-0');
    locationHeader.innerHTML = `${data.location}, ${data.country}`;
    locationDiv.appendChild(locationHeader);

    const flagSpan = document.createElement('span');
    flagSpan.classList.add('flag-icon', `flag-icon-${data.country.toLowerCase()}`, 'mt-4');
    locationDiv.appendChild(flagSpan);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);

    const main = document.createElement('h3');
    main.classList.add('card-title');
    main.innerHTML = `${data.main}`;
    cardBody.appendChild(main);

    const description = document.createElement('p');
    description.classList.add('card-text', 'mb-0', 'pb-0');
    description.innerHTML = `${data.description}`;
    cardBody.appendChild(description);

    const icon = document.createElement('img');
    icon.classList.add('my-n4');
    icon.setAttribute('src', data.iconUrl);
    cardBody.appendChild(icon);

    const temperature = document.createElement('h3');
    temperature.classList.add('card-title');
    temperature.innerHTML = `${parseInt(data.temperature, 10)}${systemSymbolMapping[unitSystem]}`;
    cardBody.appendChild(temperature);

    const feelsLike = document.createElement('p');
    feelsLike.classList.add('card-text');
    feelsLike.innerHTML = `Feels like ${parseInt(data.feelsLike, 10)}${
      systemSymbolMapping[unitSystem]
    }`;
    cardBody.appendChild(feelsLike);

    const propertiesDiv = document.createElement('div');
    propertiesDiv.classList.add('row', 'justify-content-center', 'mt-3');
    card.appendChild(propertiesDiv);

    showPropertyInfo(
      propertiesDiv,
      timeFromUnixUTC(data.sunrise + data.timezone),
      'hs',
      sunriseIcon
    );
    showPropertyInfo(propertiesDiv, timeFromUnixUTC(data.sunset + data.timezone), 'hs', sunsetIcon);
    showPropertyInfo(
      propertiesDiv,
      parseInt(data.minTemperature, 10),
      systemSymbolMapping[unitSystem],
      minTemperatureIcon
    );
    showPropertyInfo(
      propertiesDiv,
      parseInt(data.maxTemperature, 10),
      systemSymbolMapping[unitSystem],
      maxTemperatureIcon
    );
    showPropertyInfo(propertiesDiv, parseInt(data.wind, 10), 'm/s', windIcon);
    showPropertyInfo(propertiesDiv, parseInt(data.humidity, 10), '%', humidityIcon);
    showPropertyInfo(propertiesDiv, parseInt(data.cloudiness, 10), '%', cloudinessIcon);
    showPropertyInfo(propertiesDiv, parseInt(data.visibility / 1000, 10), 'km', visibilityIcon);

    const outterDiv = document.getElementById('card-container');
    outterDiv.innerHTML = '';
    outterDiv.appendChild(card);
  }

  function showError(error) {
    const card = document.createElement('div');
    card.innerHTML = '';
    const errorClass = error.message === '404' ? 'location-not-found' : 'other';
    card.classList.add(
      'card',
      'text-center',
      'w-75',
      'text-light',
      'border',
      'border-0',
      'card-background',
      'error',
      errorClass
    );

    const outterDiv = document.getElementById('card-container');
    outterDiv.innerHTML = '';
    outterDiv.appendChild(card);
  }

  function addSearchFunctionality() {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const location = document.querySelector('input').value;
      const forecast = await requestsController.getWeatherByLocation(location, unitSystem);

      if (forecast instanceof Error) {
        showError(forecast);
      } else {
        showForecast(forecast);
      }
    });
  }

  async function showInitialForecast() {
    const forecast = await requestsController.getWeatherByLocation('Visalia', unitSystem);

    if (forecast instanceof Error) {
      showError(forecast);
    } else {
      showForecast(forecast);
    }
  }

  return { addSearchFunctionality, addUnitFunctionality, showInitialForecast };
})();

export default displayController;
