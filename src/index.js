import 'bootstrap';
import './styles/style.scss';
import '@fortawesome/fontawesome-free/js/all';
import displayController from './modules/display_controller';

displayController.showInitialForecast();
displayController.addSearchFunctionality();
displayController.addUnitFunctionality();
