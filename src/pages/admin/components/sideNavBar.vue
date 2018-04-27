<template>
  <div class="navBar col-sm-1 tint-bg-color">
    <div class="side-bar">
        <div class="logo item">
                <!-- <img src="./../assets/logo.png"> -->一张logo
        </div>
        <div class="item" :class="{selected: isSelected}">
            <router-link to="/release">发布活动</router-link>
        </div>
        <div class="item" :class="{selected: isSelected}">
            <router-link to="/activityReport">活动报表</router-link>
        </div>
        <div class="item" :class="{selected: isSelected}">
            <router-link to="/activityReport">用户详情</router-link>
        </div>
        <div class="item" :class="{selected: isSelected}">
            <router-link to="/activityReport">资金详情</router-link>
        </div>
        <div class="item" :class="{selected: isSelected}">
            <router-link to="/activityReport">我的邀请</router-link>
        </div>
        <div class="item" :class="{selected: isSelected}">
            <router-link to="/activityReport">系统设置</router-link>
        </div>
        <div class="item" :class="{selected: isSelected}">
            <router-link to="/activityReport">我的消息</router-link>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style>

/* .side-bar .item {
    background: red;
} */

.item a {
    color: white;
    text-decoration: none;
}

.item.selected a {
    color: orange;
    background: white;
}
.item.logo {
    /* width: 100%; */
    background: orange;
    margin-top: 0px;
    height:60px;
}

.navBar .side-bar.col-sm-1 .item {
    background: red;
}

.navBar.col-sm-1 {
    padding-right: 0px;
    color: white;
}

</style>

<script>
export default {
    data() {
        return {
            isSelected: false
        }
    },


    created() {
        var user = this.$store.state.user;
        console.log('in mian: ', user);
        
    },

    mounted() {
        console.log('11111111');
        
    }
  
}
</script>
