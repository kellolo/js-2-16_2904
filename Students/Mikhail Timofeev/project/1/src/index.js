import './assets/style/style.css';
import './assets/style/normalize.css';

import Catalog from './components/main.js';
import Cart from './components/cart.js';

function renderPage() {
    const catalog = new Catalog();
    const cart = new Cart();

    catalog.construct(cart);
    cart.construct();
}

window.addEventListener('load', renderPage);