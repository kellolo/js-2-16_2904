import './public/style/style.css'
import './public/style/normalize.css'

import Vue from 'vue'
import app from './public/index.vue'

new Vue({
	render: h => h(app)
}).$mount('#app')