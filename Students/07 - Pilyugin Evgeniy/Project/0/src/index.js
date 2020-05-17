// импорт
import './style/style.scss';
let products = require('./app/products');
import {addItemToObj as add} from './app/listener';
import del from "./app/delete";

// строим блок с карточками товаров
products.addElementsToBlock(products.products);

// отлавливаем добавление товара в корзину
products.productsBlock.addEventListener('click', add);

// обновляем обработчики удаления
document.querySelector('.item-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-del')) {
     del(e);
  }
});