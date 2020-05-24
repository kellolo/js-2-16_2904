import './assets/style/style.css';
import './assets/style/normalize.css';

import Catalog from './components/main.js';
import Cart from './components/cart.js';


const url_api = 'https://raw.githubusercontent.com/MaiklTimofeev/Store-API/master/catalogData.json';

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            } 
        }
        xhr.open('GET', url, true);
    xhr.send();
        
    });
}

makeGETRequest(url_api)
.then(items => {
    const ITEMS = JSON.parse(items);
    console.log(ITEMS);
    const catalog = new Catalog(ITEMS);
    const cart = new Cart();
    catalog.construct(cart);
    cart.construct();
})


window.addEventListener('load', makeGETRequest);
