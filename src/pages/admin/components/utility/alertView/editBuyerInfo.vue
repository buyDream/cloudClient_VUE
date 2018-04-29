<template>
    <el-dialog title="编辑买家信息" :visible="rejectVisiable" center width="40%" @close="closeView">
        <el-form :model="form" label-position="right">
            <el-form-item label="买家头像：" :label-width="labelWidth">
                <img :src="form.profileImg" alt="" srcset="" class="profileImg">
            </el-form-item>

            <el-form-item label="微信昵称：" :label-width="labelWidth">
                <el-input v-model="form.userName" auto-complete="off" class="thirtyPersontsize" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="微信号：" :label-width="labelWidth">
                <el-input v-model="form.wechatID" auto-complete="off" class="thirtyPersontsize"></el-input>
            </el-form-item>

            <el-form-item label="性别：" :label-width="labelWidth">
                <el-select v-model="form.gender" placeholder="请选择活动区域" style="width: 100%">
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="手机号：" :label-width="labelWidth">
                <el-input v-model="form.phone" auto-complete="off" class="thirtyPersontsize"></el-input>
            </el-form-item>


            <el-form-item label="旺旺号：" :label-width="labelWidth">
                <el-input v-model="form.wwID" auto-complete="off" class="thirtyPersontsize"></el-input>
            </el-form-item>

            <el-form-item label="上次下单时间：" :label-width="labelWidth">
                <el-date-picker
                    v-model="form.latestOrder"
                    type="date"
                    value-format="timestamp"
                    placeholder="选择日期"  style="width: 100%">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="下单店铺：" :label-width="labelWidth">
                <Selector @shopNameChanged="shopNameChanged" style="width: 100%" :originValue="form.shopName"></Selector>
            </el-form-item>

            <el-form-item label="淘气值：" :label-width="labelWidth">
                <el-input v-model="form.taoqiValue" auto-complete="off" class="thirtyPersontsize"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="clickSureButton(true)" style="wdith: 60%">提 交</el-button>
        </div>
    </el-dialog>
</template>

<style scoped>
.profileImg {
    width: auto;
    height: 70px;
}

.el-form-item {
    margin-left: 0px;
}

</style>


<script>
import Selector from '../selector.vue'
export default {
    props: ['rejectVisiable', 'dataSource'],
    data() {
        return {
            labelWidth: '110px',
            form: {
                profileImg: '',
                userName: '',
                gender: 1,
                wechatID: '',
                phone: '',
                wwID: '',
                taoqiValue: '',
                latestOrder: '1524644847000',
                shopName: 9
            },

        }
    },

    watch: {
        dataSource: function(newValue, oldValue) {
            this.form.taoqiValue = newValue.credit;
            this.form.profileImg = newValue.headimgurl;
            this.form.shopName = newValue.shop_id;
            this.form.gender = newValue.sex === '男' ? 1 : 2;
            this.form.wechatID = newValue.wechat;
            this.form.userName = newValue.nickname;
            this.form.wwID = newValue.wangwang;
            this.form.phone = newValue.mobile;
            this.form.openID = newValue.openid;
            this.form.latestOrder = newValue.late_place_time * 1000;
            
        }
    },
    

    methods: {
        clickSureButton(index) {
            
            this.$emit('confirmSubmit', this.form);
        },

        // 修改提交买家信息
        closeView() { // confirm bool 是否关闭
            this.$emit('closeView');
        },

        shopNameChanged(val) {
            this.form.shopName = val;
        }
    },

    mounted() {
        // console.log('mounted alert view: ', this.labelWidth);
    },

    updated() {
        // console.log('dataSource: ', this.dataSource);
        
    },

    components: {
        Selector
    }
}


</script>

