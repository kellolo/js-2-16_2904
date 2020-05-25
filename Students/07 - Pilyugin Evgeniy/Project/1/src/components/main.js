'use strict';

// импортируем классы из файлов
import {ProductsRender, Products} from './products';
import {CartRender, Cart} from "./cart";

// наш промис, экспортируем в точку входа
/**
 * запрашиваем с сервера объект товаров
 * @param url
 */
export default function (url) {
    /**
     * возвращает промис, поэтому дальше чтоб не сломалось - чейним)
     */
    fetch(url)
        .then(response => {
            // проверяем ответ сервера, если все ок - обрабатываем
            if (response.status === 200) {
                return response.json();
            }
            // если не ок - кидаем ошибку
            throw new Error('ответ не получен');
        })
        .then(res => {
            // если все в порядке, работаетм с полученным объектом
            // подготавливаем корзину
            let cartRender = new CartRender('.cart-block');
            // отрисовываем товары на странице
            new ProductsRender('.products', res.data);
            // подтягиваем действия с товарами (добавление, удаление, пересчет....
            let cart = new Cart('.cart-block', cartRender);
            // всешаем обработчик на карточки товаров
            new Products('.products', cart);
        })
        .catch(e => {
            console.log(e.message);
        });
}
