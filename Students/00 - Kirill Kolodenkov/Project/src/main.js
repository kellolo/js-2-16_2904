import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './layout/style.css'
import './layout/normalize.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')