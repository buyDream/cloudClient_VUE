import Vue from 'vue'
import Router from 'vue-router'
// import Home from './../components/homePage.vue'
import Home from './../components/testNav.vue'
// import HelloWorld from '@/components/HelloWorld'
import Login from './../components/user/user-login.vue'
import FindPassword from './../components/find-password.vue'
import ReleasePage from '../components/release/release.vue'
import HomePage from '../components/release/home.vue'
import ActivityReport from '../components/activityReport/activityReport.vue'
import Overview from '../components/userDetail/overview.vue'
import Profile from '../components/profile/profile.vue'
import AccountInfo from '../components/accountInfo/accountInfo.vue'
import Auditor from '../components/userDetail/auditor.vue'
import Manager from '../components/userDetail/manager.vue'
import BindingShop from '../components/boundShop/boundShop.vue'
import myActivityGroup from '../components/activityManage/myActivityGroup.vue'
import myActivity from '../components/activityManage/myActivity.vue'
import ActivityDetail from '../components/activityManage/activityDetail.vue'
import ActivityModel from '../components/activityManage/activityModel.vue'


import User from '../../../store/user'
import Cookies from 'js-cookie';

import Test from '../components/activityManage/test.vue'
Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'homePage',
			component: Home,
			meta: {
				requireAuth: true,
			},
			children: [
				{
					path: '/home',
					component: HomePage,
					
				},
				{
					name: 'intraday',
					path: '/intraday',
					component: ReleasePage,
					meta: {
						requireAuth: true,
					},
				},
				{
					name: 'repurchase',
					path: '/repurchase',
					component: ReleasePage,
					meta: {
						requireAuth: true,
					},
				},
				{
					path: '/activity',
					component: ActivityReport,
					meta: {
						requireAuth: true,
					},
				},
				{
					path: '/profile',
					component: Profile,
					meta: {
						requireAuth: true,
					},
				},

				{
					path: '/test',
					component: Test,
					meta: {
						requireAuth: true,
					},
				},


				{
					path: '/accountInfo',
					component: AccountInfo,
					meta: {
						requireAuth: true,
					},
				},
				{
					path: '/auditor',
					component: Auditor,
					meta: {
						requireAuth: true,
					},
				},

				{
					path: '/overview',
					component: Overview,
					meta: {
						requireAuth: true,
					},
				},

				{
					path: '/userManager',
					component: Manager,
					meta: {
						requireAuth: true,
					},
				},

				{
					path: '/bindingShop',
					component: BindingShop,
					meta: {
						requireAuth: true,
					},
				},
				{
					path: '/myActivity',
					component: myActivity,
					meta: {
						requireAuth: true,
					},
					// children: [
					// 	{
					// 		name: 'activityDetail',
					// 		path: '/activityDetail',
					// 		component: ActivityDetail
					// 	},
					// ]
				},
				{
					path: '/myActivityGroup',
					component: myActivityGroup,
					meta: {
						requireAuth: true,
					},
				},

				{
					name: 'activityDetail',
					path: '/activityDetail',
					component: ActivityDetail,
					meta: {
						requireAuth: true,
					},
				},

				{
					path: '/activityModel',
					component: ActivityModel,
					meta: {
						requireAuth: true,
					},
				}

			]
		  },
	  {
		path: '/login',
		name: 'user-login',
		component: Login
	  },
	  {
		path: '/find-password',
		name: 'user-findpassword',
		component: FindPassword
	  },
	  
	]
})

router.beforeEach((to, from, next) => {
	
	if (to.meta.requireAuth) {
		console.log('user message: ', Cookies.get('Admin-Token'));
		
		if (User.state.token) {
			console.log('have token!!!');
			next();
		} else {
			// console.log('user message: beforeEach no token');
			next({
				path: '/login',
				query: {redirect: to.fullPath }
			})
		} 
	} else {
		next();
	}
})

function isEmptyObject(obj) {
	for (var key in obj) {
			return false;
	}
	return true;
}
  
export default router