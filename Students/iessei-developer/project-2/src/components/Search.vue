<template>
	<form action="#" class="search-form" @submit.prevent="$emit('search', searchStr)">
		<input type="text" class="search-field" v-model="searchStr">
		<button class="btn-search">
			<i class="fas fa-search"></i>
		</button>
	</form>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
	data() {
		return {
			searchStr: ''
		}
	},
}
</script>

<style>

</style>
