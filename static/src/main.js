// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// eslint-disable-next-line no-unused-vars
import fastclick from 'fastclick'
import './common/stylus/index.styl'
import axios from './api/httpUtils'
import LazyLoad from 'vue-lazyload'
import store from './store/store'
fastclick.attach(document.body)
Vue.prototype.axios = axios
Vue.prototype.bus = new Vue() // bus中心不确定
Vue.config.productionTip = false
Vue.use(LazyLoad, {
  loading: require('common/image/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  store,
  /*
  data: {
    Event: new Vue()// 用在非父子组件的传值通信
  },
  */
  components: { App },
  template: '<App/>'
})
