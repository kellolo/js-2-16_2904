'use strict';

import {ProductsRender as ProductRender} from './products';

let url = 'https://raw.githubusercontent.com/evgeny89/rest/master/data.json';

fetch(url)
    .then(response => {
        if (response.status === 200) {
            return response.json();
        }
        throw new Error('ответ не получен');
    })
    .then(res => {
        new ProductRender(res.data, '.products');

    })
    .catch(e => {
        console.log(e.message);
    });
