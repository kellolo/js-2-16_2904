
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        showCart: false,
        imgCart: 'https://placehold.it/100x80',
        imgCatalog: 'https://placehold.it/200x150',
        cartUrl: '/getBasket.json',
        catalogUrl: '/catalogData.json',
        cartProducts: [],
        items: [],
    },
    methods: {
        get(url){
            return fetch(url).then(data => data.json());
        },
        addProduct(item){
            this.get(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartProducts.find(elem => elem.id_product === item.id_product);
                        if(find){
                            find.quantity++;
                            } else {
                            let item1 = Object.assign({quantity: 1}, item);
                            this.cartProducts.push(item1);
                        }
                    } else {
                        throw new Error ('Error')
                    }
                })
        },
        deleteProduct(item) {
            this.get(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        if(item.quantity > 1){
                            item.quantity--;           
                        } else {
                            this.cartProducts.splice(this.cartProducts.indexOf(item), 1);
                        }
                    } else {
                        throw new Error('Error');
                        
                    }
                })
        },
    },
    mounted(){
        this.get(`${API + this.cartUrl}`).then(data => {
            for( let elem of data.contents) {
                this.cartProducts.push(elem);
            }
        });
        this.get(`${API + this.catalogUrl}`).then(data => {
            for (let elem of data){
                this.items.push(elem);
            }
        });
    }
});


export default app;

