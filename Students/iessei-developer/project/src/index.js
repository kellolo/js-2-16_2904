import './style/style.css';
import './style/normalize.css';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Vue from 'vue';
import app from './views/Shop.vue';


new Vue({
    render: h => h(app)
}).$mount('#app');