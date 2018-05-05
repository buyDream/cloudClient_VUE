<template>
  <div>
    <div class="nav">
        <mt-navbar class="page-part" v-model="selected">
            <mt-tab-item  v-for="item in topArr" :id="item.activeId" :key="item.activeId">{{ item.activeTitle }}</mt-tab-item>
        </mt-navbar>
    </div>

    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="selected" swipeable>
        <mt-tab-container-item v-for="(item, index) in topArr" :id="item.activeId" :key="item.activeId">
            <MyActivityContent :activityType="index"></MyActivityContent>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>

import MyActivityContent from './myActivityContent.vue'
export default {
    name: 'page-tab-container',
    data() {
        return {
            selected: 'tab-container1',
            topArr: [
                {activeId: 'tab-container1', activeTitle: '全部'},
                {activeId: 'tab-container2', activeTitle: '待付款'},
                {activeId: 'tab-container3', activeTitle: '已放弃'},
                {activeId: 'tab-container4', activeTitle: '待确认'},
                {activeId: 'tab-container5', activeTitle: '已完成'},
                {activeId: 'tab-container6', activeTitle: '新消息'},
            ],
        };
    },
    components: {
        MyActivityContent
    }
};
</script>

<style lang="css" scoped>
  /* .page-tab-container {
      background: rgb(243, 244, 245);
  } */

  .nav {
    /* padding: 10px; */
    border-bottom: 1px solid gainsboro;
  }

  .link {
    color: inherit;
    padding: 20px;
    display: block;
  }

  

</style>
