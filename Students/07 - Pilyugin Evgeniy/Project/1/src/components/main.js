import {cart as cart} from './cart';

Vue.component('product', {
    props: ['item'],
    data: function () {
        return {
            API: 'https://raw.githubusercontent.com/evgeny89/rest/master/',
            addRequest: 'addToBasket.json'
        }
    },
    template: `<div class="product-item">
                    <img :src="item.img" width="300" height="200" :alt="item.name">
                    <div class="desc">
                        <h1>{{ item.name }}</h1>
                        <p>{{ item.price }}</p>
                        <button
                        class="buy-btn" 
                        name="buy-btn"
                        :data-img="item.img"
                        :data-name="item.name"
                        :data-price="item.price"
                        :data-id="item.id"
                        @click="addToCart"
                        >Купить</button>
                    </div>
                </div>`,
    methods: {
        addToCart: function (product) {
            let url = this.API + this.addRequest;
            fetch(url)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    throw new Error('ответ не получен');
                })
                .then(res => {
                    if (res.result === 1) {
                        cart.addItem(product.target.dataset.id);
                        } else {
                        throw new Error('добавление товара отклонено сервером');
                    }
                })
                .catch(e => {
                    console.log(e.message);
                });
        }
    }
});

let products = new Vue({
    el: '#products',
    data: {
        url: 'https://raw.githubusercontent.com/evgeny89/rest/master/data.json',
        items: null
    },
    mounted: function () {
        fetch(this.url)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error('ответ не получен');
            })
            .then(json => {
                this.items = json.data;
                cart.items = this.items;
            });
    }
});

new Vue({
    el: '#form',
    data: {
        searchText: null,
    },
    methods: {
        searching: function () {
            if (this.searchText !== '') {
                let regText = new RegExp(`^(${this.searchText.trim().toLowerCase()})[a-z]*$`);
                let search = products.items.filter(elem => {
                   return !elem.name.toLowerCase().search(regText);
                });
                console.log(search);
            }
        }
    }
});
