new Vue({
    el: '#cart-btn',
    methods: {
        show() {
            cart.isShow = !cart.isShow;
        }
    }
});

Vue.component('backet', {
    props: ['item'],
    data: function () {
        return {
            API: 'https://raw.githubusercontent.com/evgeny89/rest/master/',
            deleteRequest: 'deleteFromBasket.json'
        }
    },
    template: `<div class="cart-item" :data-id="item.id">
                    <img :src="item.img" width="120" :alt="item.name">
                    <div class="product-desc">
                        <p class="product-title">{{ item.name }}</p>
                        <p class="product-quantity">{{ item.countSum }}</p>
                        <p class="product-single-price">{{ item.price }}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" :data-id="item.id" @click="deleteItem">&times;</button>
                    </div>
                </div>`,
    methods: {
        deleteItem: function (product) {
            let url = this.API + this.deleteRequest;
            fetch(url)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    throw new Error('ответ не получен');
                })
                .then(res => {
                    if (res.result === 1) {
                        cart.deleteFromCart(product.target.dataset.id);
                    } else {
                        throw new Error('добавление товара отклонено сервером');
                    }
                })
                .catch(e => {
                    console.log(e.message);
                });
        }
    }
})

export let cart = new Vue({
    el: '#cart-block',
    data: {
        isShow: false,
        items: [],
        itemList: null,
        countItems: 0,
        total: 0
    },
    methods: {
        addItem(id) {
            let item = this.items.find(item => {
                return item.id === id;
            });
            if (item.hasOwnProperty('countSum')) {
                item.countSum += 1;
            } else {
                item.countSum = 1;
            }
            this.update();
        },
        deleteFromCart(id) {
            let item = this.items.find(item => {
                return item.id === id;
            });
            if (item.countSum > 1) {
                item.countSum -= 1;
            } else {
                item.countSum = 0;
            }
            this.update();
        },
        update() {
            this.countItems = 0;
            this.total = 0;
            this.itemList = this.items.filter(item => item.countSum > 0);
            this.itemList.forEach(elem => {
                this.countItems += elem.countSum;
                this.total += elem.price * elem.countSum;
            });
        }
    }
});

