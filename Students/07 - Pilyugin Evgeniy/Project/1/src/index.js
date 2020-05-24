// импорт стилей
import './assets/style/style.css';
import './assets/style/normalize.css';


// импорт основного файла
import app from './components/main.js';

// адрес для запроса
let url = 'https://raw.githubusercontent.com/evgeny89/rest/master/data.json';

// запускаем приложение с указанным адресом
app(url);