import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

require('@/store/subscriber.js');

axios.defaults.baseURL = 'http://localhost:8000/';

Vue.config.productionTip = false;

Vue.config.warnHandler = function(msg, vm, trace) {
  console.log(`Warn: ${msg}\nTrace: ${trace}`);
};

store.dispatch('auth/attemp', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});



