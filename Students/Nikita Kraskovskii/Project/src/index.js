import './assets/styles/style.css';
import './assets/styles/normalize.css';


import Vue from 'vue';
import app from './views/Shop.vue';

new Vue ({
    render: h => h(app)
}).$mount('#app');