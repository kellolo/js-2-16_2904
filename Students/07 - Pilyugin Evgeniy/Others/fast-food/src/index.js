import './style/style.scss';
import calc from './app/main';

// запускаем функцию, чтобы отрендерить дефолтный рендер
calc();

document.querySelector('form').addEventListener('change', calc);