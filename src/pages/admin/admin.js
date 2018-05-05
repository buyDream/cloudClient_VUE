// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import swal from 'sweetalert'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import axios from 'axios'
import store from './../../store/store'
import VueLazyload from 'vue-lazyload'
import {get, post, put, getList} from './../../api/common'

import '../../../theme/index.css'
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Element)
Vue.use(axios)
Vue.use(VueRouter)
Vue.use(VueLazyload)

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/static/img/img-error.png',
	// loading: 'dist/static/img/loading.gif',
	error: 'static/img/img-error.png',
	loading: 'https://www.mawazna.com/img/loading-img.gif',
	// loading: 'static/img/loading.gif',
  attempt: 1
})
/* eslint-disable no-new */
Vue.prototype.bus = new Vue();
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

  created() {
	// this.checkLogin();
  },
  methods: {
	// checkLogin(){
	// 	//检查是否存在session
	// 	//cookie操作方法在源码里有或者参考网上的即可
	// 	if(User.state.token){
		  
	// 	}else{
	// 	  //否则跳转到登录后的页面
	// 	//   this.$router.push('/user_info');

	// 	}
	//   }
  }
})

