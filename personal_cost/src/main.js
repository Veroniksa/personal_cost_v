import Vue from 'vue';
import App from './App.vue';

import modale from './plugins/modalWindow/insed';
import modal from './plugins/modalWindow';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;
Vue.use(modal);
Vue.use(modale);

new Vue({
  render: h => h(App),
  store,
  vuetify,
  router
}).$mount('#app');
