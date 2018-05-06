
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import TabBar from '../components/tabBar.vue'
// import Home from '../components/homePage/homePage.vue'
import Introduction from '../components/introduction/introduction.vue'
import Profile from '../components/profile/profile.vue'
import MyActivity from '../components/profile/myActivity/myActivity.vue'
import ActivityDetail from '../components/profile/myActivity/activityDetail.vue'
import PrivateInfo from '../components/profile/private/privateInfo.vue'
import ProfileSetting from '../components/profile/private/privateInfoSetting.vue'
import MsgRemind from '../components/profile/myServer/messageRemind.vue'
import SingleMsg from '../components/profile/myServer/singleMsgRemind.vue'
import Setting from '../components/profile/myServer/setting.vue'
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
		path: '/activityDetail',
		name: 'activityDetail',
		component: ActivityDetail
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

	{
		path: '/setting',
		name: 'setting',
		component: Setting
	},

	{
		path: '/singleMsg',
		name: 'singleMsg',
		component: SingleMsg
	},
	
  ]
})
