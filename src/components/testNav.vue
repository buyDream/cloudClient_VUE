<template>
  <el-container style="border: 1px solid #eee">
  <el-aside width="200px">
    <el-menu 
        router
        text-color="#fff"
        @select="selectMenu"
        @click="handleSelect">
        <el-menu-item index="logo" disabled>
            <i class="el-icon-menu"></i>
            <!-- <span slot="title">一张logo</span> -->
      </el-menu-item>
      <el-menu-item index="home" router>
        <template slot="title"><i class="el-icon-message"></i>
            发布活动
        </template>
      </el-menu-item>
      <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>活动管理</template>
            <el-menu-item index="myActivity" router>我的活动</el-menu-item>
            <el-menu-item index="activityModel" router>活动模板</el-menu-item>
      </el-submenu>
     
      <el-menu-item index="bindingShop" router>
        <template slot="title"><i class="el-icon-message"></i>
            绑定店铺
        </template>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>用户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
            <el-menu-item index="overview" >用户总览</el-menu-item>
            <el-menu-item index="auditor">用户审核</el-menu-item>
            <el-menu-item index="userManager">用户管理</el-menu-item>
      </el-submenu>
        <el-menu-item index="accountInfo">
            <template slot="title"><i class="el-icon-setting"></i>资金详情</template>
        </el-menu-item>
      <el-menu-item index="#">
        <template slot="title"><i class="el-icon-setting"></i>我的邀请</template>
      </el-menu-item>
      <el-menu-item index="profile">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header height="30px">
            <div class="fl">
                <a class="top-nav-item" href="#">{{userName}}，欢迎您！</a>
            </div>
            <div class="fr">
                <i class="el-icon-setting"></i>
                <a class="top-nav-item" href="#">首页</a>
                <i class="el-icon-setting"></i>
                <a class="top-nav-item" href="#">在线客服</a>
                <i class="el-icon-setting"></i>
                <a class="top-nav-item" href="#" @click="logout">退出</a>
            </div>
    </el-header>
    
    <el-main>
        <SearchBar v-if="showSearchBar"></SearchBar>
        <el-col :span="24" class="breadcrumb-container">
          <!-- <strong class="title">{{$route.name}}</strong> -->
          <el-breadcrumb separator="/" class="breadcrumb-inner">
            <!-- <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
              {{ item.name }}
            </el-breadcrumb-item> -->
          </el-breadcrumb>
        </el-col>
        <el-col :span="24">
          <!-- <div style="margin-top:10px"> -->
            <div>
                <router-view></router-view>    <!-- 最重要的标签，用来显示跳转的页面 -->
            </div>
        </el-col>
    </el-main>
  </el-container>
</el-container>
</template>

<script>

import User from '../store/user'
import Cookies from 'js-cookie';
export default {
//   name: 'homePage',
    data() {
        return {
            isActive: false,
            showSearchBar: false,
            userName: User.state.username
        }
    },
    methods: {
        handleSelect(key, keyPath){
            switch(key){
                case '1':
                    this.$router.push('/home');
                    break;
                case '2':
                    this.$router.push('/forms')
                    break;
                case '7':
                    this.$router.push('/profile')
            }
        },
        clickItem() {
          console.log('122222');
        //   this.isActive = true;
        },
    //   closeSubmenu() {
    //       console.log('1213121331');
          
    //   }
        selectMenu(key, keyPath) {
            console.log(keyPath, key);
            
        },
        logout: function () {
            Cookies.remove('Admin-Token');
            Cookies.remove('Admin-UserName');
            this.$router.go('/login')
        }
    },
    created() {
        var user = this.$store.state.user;
        this.userName = Cookies.get('Admin-UserName')
    },
    updated() {
        // console.log('main update');
        
    }
}
</script>

<style>

body {
    background: rgb(240, 246, 246);
}

a {
    text-decoration: none;
}

.pageTitle {
    border-bottom: 1px solid rgb(228, 229, 230);
    padding-left: 14px;
    line-height: 40px;
}

.pageTitle::before {
  content: "";
  display: inline-block;
  width: 3px;
  height: 17px;
  background: #2F3A53;
  vertical-align: middle;
  margin-right: 5px;
}

.el-header {
    background-color: white;
}

.el-header .top-nav-item {
  display: inline-block;
  padding: 6px 10px;
  color: #666;
}

.el-header .top-nav-item:hover {
  color: rgb(250, 136, 43);
}

.el-menu {
    background-color: #2F3A53;;
    /* padding-bottom: 50px; */
    height: 100%;
}
.el-aside {
    height: 100vh;
}
.el-form-item {
    margin-left: 20px;
}

.el-form-item.fr {
    /* height: 50px; */
    display: inline;
}

.el-menu i {
    color: #fff;
}


.el-menu-item.is-active {
    background: #147ce8;
    color: white;
}

.el-submenu__title:hover {
    background: #147ce8;
}

.el-menu-item:hover,.el-menu-item:focus {
    padding-left: 20px;
    background: #147ce8;
}
/* .mainPage .contenArea {
    padding: 10px 10px 10px 30px;
} */
</style>


