import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/icon/iconfont.css'
import request from './api/Api.js'
Vue.prototype.$http = request

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
