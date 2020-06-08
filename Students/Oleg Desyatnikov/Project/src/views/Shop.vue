<template>
  <div>
	<header>
		<div class="logo">E-shop</div>
		<div class="cart">
			<form action="#" class="search-form">
				<input type="text" class="search-field">
				<button class="btn-search">
					<i class="fas fa-search"></i>
				</button>
			</form>
			<button class="btn-cart" @click="showBasket = !showBasket">Cart</button>
			<Basket ref="basket" v-show="showBasket"/>
		</div>
	</header>
	<main>
		<Catalog @add="addItem" />
	</main>
  </div>
</template>


<script>
import Basket from '../containers/Basket.vue'
import Catalog from '../containers/Catalog.vue'

export default {
	components: { Basket, Catalog },
	data() {
		return {
			showBasket: false
		}
	},
	methods: {

		get(url) {
			return fetch(url).then(d => d.json());
		},

		post(url, item) {
			return fetch(url, { 
				method: 'POST',
				headers: {
					"Content-Type": "aplication-json"
				},
				body: JSON.stringify(item)
			})
		},

		put(url, dir) {
			return fetch(url, { 
				method: 'PUT',
				headers: {
					"Content-Type": "aplication-json"
				},
				body: JSON.stringify(dir)
			})
		},

		delete(url) {
			return fetch(url, { 
				method: 'DELETE',
				headers: {
					"Content-Type": "aplication-json"
				},
			})
		}, 
		
		addItem(pl) {
			this.$refs.basket.add(pl)
		}
	}	
}
</script>
