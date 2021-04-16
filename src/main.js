import Vue from 'vue'
import App from './App.vue'
import GetDataAsync from './plugins/getDataFunc'

Vue.use(GetDataAsync);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
