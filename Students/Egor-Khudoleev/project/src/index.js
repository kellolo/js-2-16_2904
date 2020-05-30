import './assets/css/style.sass';
import 'normalize.css/normalize.css'

import Vue from 'vue';
import app from './views/app.vue';

new Vue({
    render: h=> h(app)
}).$mount('#app')