// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import swal from 'sweetalert'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import axios from 'axios'
import store from './../../store/store'

import {get, post, put, getList} from './../../api/common'

import '../../../theme/index.css'
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Element)
Vue.use(axios)
Vue.use(VueRouter)

/* eslint-disable no-new */
Vue.prototype.bus = new Vue();
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})

