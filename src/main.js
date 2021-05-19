// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/font.css'
import './assets/css/global.css'
import './permission'
import {hasPermission} from './utils/hasPermission'
import {default as api} from './utils/api'

Vue.prototype.hasPerm = hasPermission

//elementUI
Vue.use(ElementUI)
Vue.use(Router)

//解决连续点击多次同一路由报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//mock
require('./mock')

Vue.prototype.api=api

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
