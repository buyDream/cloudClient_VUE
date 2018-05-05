<template>
    <div class="bodyPage">
        <ul>
            <li v-for="(item, index) in infoList" :key="index">
                <template v-if="index === 0">
                    <mt-cell title="标题文字" is-link @click.native="sheetVisible = true">
                        <img src="../../../assets/profile.png" alt="" srcset="" width="64px">
                    </mt-cell>
                </template>
                <template v-else-if="index === 1">
                    <mt-cell  :title="item.title" :value="item.subTitle"></mt-cell>

                </template>
                <template v-else>
                    <mt-cell  :title="item.title" is-link :value="item.subTitle" :to="{ name: 'profileSetting', params:{'index':index} }"></mt-cell>
                </template>
                
            </li>
        </ul>
        
        <div class="bottomButton">
            <mt-button type="primary" style="width: 94%;" class="themeBgPurple" @click.native="handleSubmit">提交审核</mt-button>
        </div>

        <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
</template>

<script>
export default {
    data() {
        return {
            infoList: [
                {'title': "头像", "subTitle": "image"},
                {'title': "微信昵称", "subTitle": "Canda"},
                {'title': "微信号", "subTitle": "待绑定"},
                {'title': "性别", "subTitle": "女"},
                {'title': "年龄", "subTitle": "23"},
                {'title': "手机号", "subTitle": "13211111111"},
                {'title': "旺旺名", "subTitle": "gkkjmmkjj_33"},
                {'title': "淘气值", "subTitle": "1560"},
                {'title': "上次购物店铺", "subTitle": "优衣库旗舰店"},
                {'title': "上次购物时间", "subTitle": "2018-6-30"},
            ],
            sheetVisible: false,
            actions: [
                {
                    name: '图片',
                    method: this.takePhoto
                }, {
                    name: '相机',
                    method: this.openAlbum
                }
            ],
        }
    },
    methods: {

      takePhoto() {
        console.log('taking photo');
      },

      openAlbum() {
        console.log('opening album');
      },

      handleSubmit() {
          this.$router.go(-1);
      }

    },
}
</script>

<style scoped>

/* .bodyPage .bottomButton {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 20px;
} */
.bodyPage .mint-cell-value img {
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 50%;
}

</style>

