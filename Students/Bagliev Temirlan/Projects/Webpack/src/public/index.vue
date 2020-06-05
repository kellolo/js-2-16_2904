<template>
    <div>
        <header>
            <div class="logo">E-shop</div>
            <search/>
            <div class="cart" id="cart">
                <button class="btn-cart" @click="seenCart = !seenCart">Cart</button>
                <cart ref="cart"  v-show="seenCart"/>
            </div>
        </header>
        <main >
            <catalog ref="catalog"/>
        </main>
    </div>
</template>

<script>
import catalog from './containers/Catalog.vue'
import cart from './containers/Cart.vue'
import search from './components/search.vue'
export default {
    components: {catalog, cart, search},
    data(){
        return{
            seenCart: false,
        }
    },
    methods: {
        getData(url) {  
            return  fetch(url).then(data => data.json())
        },
        postData (url, obj) {
            return fetch(url, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(obj)
            }).then(data => data.json())
        },
        changeData (url, obj) {
            return fetch(url, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(obj)
            }).then(data => data.json())
        },
        deleteData(url, obj) {  
            return fetch(url, {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(obj)
            }).then(data => data.json())
        },
    }
}
</script>
