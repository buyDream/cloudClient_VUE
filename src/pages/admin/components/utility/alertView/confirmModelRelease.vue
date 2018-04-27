<template>
    <el-dialog title="收货地址" :visible="visiable" center width="30%" :show-close="false" @close="clickButton(false)">
        <div class="block">
            <div class="itemTitle fl">买家拍下总金额：</div>
            <span v-if="modelItem.price > 0">{{modelItem.price}}</span>
            <span v-else>-</span>
        </div>
        <div class="block">
            <div class="itemTitle fl">店铺旺旺ID：</div>
            <span v-if="modelItem.shopBossID.length > 0">{{modelItem.shopBossID}}</span>
            <span v-else>-</span>
        </div>
        <div class="block">
            <div class="itemTitle fl">宝贝主图：</div>
            <img :src="modelItem.mainPicUrl" alt="" srcset="">
        </div>
        <div class="block">
            <div class="itemTitle fl">赠品图片：</div>
            <img :src="modelItem.presentImgUrl" alt="" srcset="">
        </div>
        <span slot="footer" class="dialog-footer">
            <div class="notice-msg">注意：以上内容若有错误，将影响活动完成，请检查清楚哦！</div>
            <el-button type="success" @click="clickButton(true)">我已确认无误</el-button>
            <el-button type="primary" @click="clickButton(false)">返回再次确认</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: ['visiable', 'modelItem'],

    methods: {
        clickButton(confirm) {
            this.$emit('convertModelTitle', confirm);
        }
    },

    updated() {
        console.log('price: ', this.modelItem.price);
        
    }
}
</script>

<style scoped>


.el-dialog .el-dialog__body {
    /* padding-bottom: 15px; */
    padding: 25px 25px 30px 0px
}

.dialog-footer .notice-msg {
    padding-bottom: 5px;
}
.block {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    margin-top: 10px;
    /* margin-bottom: 10px; */
}

.block img {
    width: 100px;
}

</style>

