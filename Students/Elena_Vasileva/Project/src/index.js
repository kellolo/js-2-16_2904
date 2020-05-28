import './assets/style/style.css';
import './assets/style/normalize.css';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Vue from 'vue';
import app from './views/Shop.vue';

//если вы будете накидывать глобальные модули/библиотеки на Вью, то делайте это здесь
//import someModule from 'some-module'
// Vue.use()
// Vue.component('someComp', someModule);

new Vue({
    render: h => h(app)
}).$mount('#app');
