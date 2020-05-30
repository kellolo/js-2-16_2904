import './assets/styles/style.css';
import './assets/styles/normalize.css';

//npm i bootstrap jquery popper.js
//import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';

import Vue from 'vue';
import app from './views/Shop.vue';

new Vue({
    render: h => h(app)
}).$mount('#app');