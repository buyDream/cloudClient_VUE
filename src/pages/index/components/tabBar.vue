<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
		  
        <mt-tab-container-item id="home">
          <Home></Home>
        </mt-tab-container-item>
        <mt-tab-container-item id="introduction">
          <!-- <mt-cell v-for="n in 7" :title="'发现 ' + n" :key="n"/> -->
          <Introduction></Introduction>
        </mt-tab-container-item>
        <mt-tab-container-item id="profile">
			<Profile></Profile>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model="selected" fixed>
		<mt-tab-item v-for="tabbarItem in tabbarArr" :id="tabbarItem.tabbar_id" :key="tabbarItem.tabbar_id">
			<template v-if="selected === tabbarItem.tabbar_id">
				<img slot="icon" :src="tabbarItem.tabbar_selected_img">
			</template>
			<template v-else>
				<img slot="icon" :src="tabbarItem.tabbar_img">
			</template>
			{{ tabbarItem.tabbar_title }}
		</mt-tab-item>

    </mt-tabbar>
  </div>
</template>

<script>
import Home from './homePage/homePage.vue'
import Profile from './profile/profile.vue'
import Introduction from './introduction/introduction.vue'
export default {
  name: 'page-tabbar',
  data() {
    return {
	  	selected: 'home',
	  	tabbarArr: [
				{tabbar_id: "home", tabbar_title: "首页", tabbar_img: require('../assets/home_tabbar.png'), tabbar_selected_img: require('../assets/home_tabbar_selected.png')},
				{tabbar_id: "introduction", tabbar_title: "介绍", tabbar_img: require("../assets/introduction_tabbar.png"), tabbar_selected_img: require('../assets/introduction_tabbar_selected.png')},
				{tabbar_id: "profile", tabbar_title: "我的", tabbar_img: require("../assets/profile_tabbar.png"), tabbar_selected_img: require('../assets/profile_tabbar_selected.png')},
			],
    };
  },

  components: {
	Home, Profile, Introduction
  }
};
</script>

<style>
  .page-tabbar {
    overflow: hidden;
    min-height: 100vh;
    background: rgb(246, 247, 248);
  }

  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
  }

  .page-title {
	  margin: 20px auto;
  }

  .mint-tabbar > .mint-tab-item.is-selected {
	color: rgb(251, 0, 139);
}
</style>
