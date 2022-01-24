import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';
import '@fortawesome/fontawesome-free/js/all';
import requestsController from './modules/requests_controller';

requestsController.getWeatherByLocation('Barcelona');
requestsController.getWeatherByLocation('qwerty6543');
requestsController.getWeatherByLocation('London');
