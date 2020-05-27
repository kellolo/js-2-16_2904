export default function () {

    let API = 'https://raw.githubusercontent.com/teitumx/static/master/GeekBrains/Shop/';

    new Vue({
        el: '#app',
        data: {
            catalogItems: [],
            basketItems: [],
            catalogUrl: API + 'catalogData.json',
            basketUrl: API + 'getBasket.json',
            show: true
        },
        mounted() {
            this.get(this.catalogUrl)
                .then(data => {
                    this.catalogItems = data;
                })
            this.get(this.basketUrl)
                .then(data => {
                    this.basketItems = data;
                })
        },
        methods: {
            get: function (url) {
                return fetch(url).then(data => data.json())
            },

        }
    });
}