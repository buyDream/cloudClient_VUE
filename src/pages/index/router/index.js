
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import TabBar from '../components/tabBar.vue'
// import Home from '../components/homePage/homePage.vue'
import Introduction from '../components/introduction/introduction.vue'
import Profile from '../components/profile/profile.vue'
import MyActivity from '../components/profile/myActivity/myActivity.vue'
import PrivateInfo from '../components/profile/private/privateInfo.vue'
import ProfileSetting from '../components/profile/private/privateInfoSetting.vue'
import MsgRemind from '../components/profile/myServer/messageRemind.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: TabBar
	},

	{
		path: '/introduction',
		name: 'introduction',
		component: Introduction
	},
	
	{
		path: '/myActivity',
		name: 'MyActivity',
		component: MyActivity
	},

	{
		path: '/privateInfo',
		name: 'privateInfo',
		component: PrivateInfo
	},

	{
		path: '/profileSetting/:index',
		name: 'profileSetting',
		component: ProfileSetting
	},
	
	{
		path: '/msgRemind',
		name: 'msgRemind',
		component: MsgRemind
	},
	
  ]
})
