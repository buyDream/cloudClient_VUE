<template>
    <div class="bodyPage">
        <template v-if="contentType === 2">
            <div class="noticeMsg">
                请填写您的微信号准确无误，方便商家安排返款与联系您
            </div>
            <mt-field placeholder="微信号" v-model="wechatID"></mt-field>
        </template>

        <template v-else-if="contentType === 3">
            <div class="noticeMsg">
                请选择您的性别
            </div>
            <!-- <el-radio v-model="genderRadio" label="1">男</el-radio>
            <el-radio v-model="genderRadio" label="2">女</el-radio> -->
            <mt-radio
                v-model="genderRadio"
                :options="['男', '女']">
            </mt-radio>
        </template>

        <template v-else-if="contentType === 4">
            <div class="noticeMsg">
                请填写您的真实年龄
            </div>
            <mt-field placeholder="例：23" v-model="age"></mt-field>
        </template>


        <template v-else-if="contentType === 5">
            <div class="noticeMsg">
                请填写您的联系手机号，方便商家安排返款与联系您
            </div>
            <mt-field placeholder="例：18966662222" v-model="phone"></mt-field>
        </template>

        <template v-else-if="contentType === 6">
            <div class="wwIDMsg whiteColor">
                <mt-field label="旺旺名" placeholder="请写您的淘宝会员名，非昵称" v-model="wwID"></mt-field>
                <div style="padding-left:10px">
                    上传旺旺名截图
                    <span class="themeBlue">(查看如何上传旺旺名示例截图>)</span>
                </div>
                <div class="printscreen">
                    <div class="uploadButton" @click="uploadImage(1)">
                        <img src="../../../assets/uploadImg@2x.png" alt="" srcset="" width="30%">
                    </div>
                    旺旺名截图
                </div>
            </div>
        </template>

        <template v-else-if="contentType === 7">
            <div class="wwIDMsg whiteColor">
                <mt-field label="淘气值" placeholder="请写您的淘气值" v-model="wwID"></mt-field>
                <div style="padding-left:10px">
                    上传淘气值截图
                    <span class="themeBlue">(查看如何上传淘气值示例截图>)</span>
                </div>
                <div class="printscreen">
                    <div class="uploadButton" @click="uploadImage(2)">
                        <img src="../../../assets/uploadImg@2x.png" alt="" srcset="" width="30%">
                    </div>
                    淘气值截图
                </div>
            </div>
        </template>

        <template v-else-if="contentType === 8">
            <div class="noticeMsg">
                请选择您上次在本商家购买过的店铺，若一下都不符合，请选择“无”
            </div>
            <mt-radio
                v-model="shopID"
                :options="shopArr">
            </mt-radio>
        </template>

        <template v-else-if="contentType === 9">
            <div class="lastPurchaseTime">
                <div class="item">
                    <label class="zy_radio">
                        <input type="radio" name="purchaseType" value="1" v-model="purchaseType"/>
                        <span style="padding-left:2px">在本店购买过</span>
                    </label>
                    <div class="itemContent">
                        <span style="">请选择上次购物时间</span>
                        <div>
                            -------
                        </div>
                        <span>请真实填写您在本店的订单编号，方便商家核对</span>
                    </div>
                    <mt-field placeholder="例：111111115555522332233" v-model="orderID"></mt-field>
                </div>

                <div class="item">
                    <label class="zy_radio">
                        <input type="radio" name="purchaseType" value="2" v-model="purchaseType"/>
                        <span style="padding-left:2px">在本店未曾购买过</span>
                    </label>
                </div>
            </div>

        </template>
        <div class="bottomButton">
            <mt-button type="primary" style="width: 94%;" class="themeBgPurple" @click.native="handleCertainBtn">确定</mt-button>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            wechatID: '',
            genderRadio: '男',
            age: '',
            phone: '',
            wwID: '',

            shopID: '0',
            shopArr: [
                {label: '剪刀石头布旗舰店', value: '2'},
                {label: '优衣库', value: '1'},
                {label: '无', value: '0'},
            ],
            purchaseType: 1,

            orderID: '',

        }
    },

    computed: {
        contentType() {
            return parseInt(this.$route.params.index);
        }
    },

    methods: {
        uploadImage(val) {
            console.log('uploadImage-------:', val);
            
        },

        handleCertainBtn() {
            this.$router.go(-1);
        }
    }
}
</script>

<style>
    .bodyPage .noticeMsg {
        padding: 20px 10px;
        font-size: 13px;
    }

    .bodyPage .el-radio {
        margin-left: 10px;
    }

    .bodyPage .el-radio .el-radio__label {
        padding-left: 10px;
    }

    /* .bodyPage .wwIDMsg {

    } */

    .bodyPage .mint-field .mint-cell-title {
        width: 55px;
    }

    .bodyPage .wwIDMsg .mint-field .mint-cell-value {
        border: 1px solid rgb(230, 231, 232);
        border-radius: 3px;
    }

    .bodyPage .mint-cell-wrapper {
        font-size: 14px;
    }

    .bodyPage .wwIDMsg .mint-cell-wrapper {
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .bodyPage .printscreen {
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .bodyPage .printscreen .uploadButton {
        margin-bottom: 10px;
    }

    .bodyPage .lastPurchaseTime .item {
        /* padding: 20px auto; */
        padding-top: 20px;
        padding-bottom: 10px;
    }

    .bodyPage .lastPurchaseTime .item  .zy_radio {
        margin-left: 10px;
        
    }

    .bodyPage .lastPurchaseTime .item .itemContent {
        /* margin-top:10px;
        padding-left:27px;
        padding-bottom: 10px; */
        padding: 10px 1px 10px 27px;
    }
    
    
    
</style>

