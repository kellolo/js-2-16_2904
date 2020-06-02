const product = {
    props: ['product', 'img'],
    data() {
        return {
            /**
             * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
             * то мы легко можем получить доступ к ним используя свойство $root.
             * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
             */
            cartAPI: this.$root.$refs.cart, // добираемся до компонента корзины, чтобы далее использовать метод добавления
        };
    },

    template: `
    <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <button class="buy-btn" @click="cartAPI.addProduct(product)">Купить</button>
<!-- 1                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>-->
<!-- 2                    <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>-->
                </div>
            </div>
    `
};

const products = {
    components: { product },
    data(){
        return {
            products: [],
            filtered: [],
            imgCatalog: 'https://placehold.it/200x150',
        }
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
};

export default products;
