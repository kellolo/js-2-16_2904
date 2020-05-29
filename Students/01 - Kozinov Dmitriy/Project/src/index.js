import "./assets/style/style.css";
import "./assets/style/normalize.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Vue from "vue";
import app from "./views/Shop.vue";

//если накидывать глобальные модули или библиотеки то делать это здесь
//например
//import someModule from 'some-moddule'
//Vue.use();
//Vue.component('someComponent', 'someModule');

new Vue({
  render: (h) => h(app),
}).$mount("#app");
