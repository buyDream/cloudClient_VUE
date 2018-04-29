<template>
    <div class="mainPage clear-float">
        <div class="pageTitle">
                    {{this.pageTitle}}
            <el-select v-model="templateID" placeholder="请选择活动模板" @change="selectModel">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item">
                    <span style="float: left">{{ item.label }}</span>
                    <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                </el-option>
            </el-select>
        </div>
        <div class="contenArea">
            <form action="" method="post">
                <div class="promotion">
                    <div id="accordion">
                        <el-collapse v-model="activitySigins" @change="handleChange">
                            <SecondForm :checked="checked" @formParmsChange="formParmsChange" @checkSuccessed="checkSuccessed" :form="baseFormParms"></SecondForm>
                            <ThirdForm :checked="checked" @formParmsChange="formParmsChange" :form="activityTypeFormParms"></ThirdForm>
                            <FourthForm :checked="checked" @formParmsChange="formParmsChange" :form="activityReleaseTimeParms" :group="activityType === 2"></FourthForm>
                        </el-collapse>

                        <el-button v-if="editeModel === false" type="warning" @click="confirmModelTitleViewVisiable = true;" >发布并保存模板</el-button>
                        <el-button v-if="editeModel === false" type="primary" @click="confirmModelReleaseViewVisiable = true">发布</el-button>
                        <el-button v-if="editeModel === true" type="primary" @click="confirmModelTitleViewVisiable = true;">保存活动模板</el-button>
                    </div>
                                
                </div>
            </form>
            <ConfirmModelTitleView :visiable="confirmModelTitleViewVisiable" @convertModelTitle="convertModelTitle" :form="activityTitle"></ConfirmModelTitleView>

            <ConfirmModelReleaseView :visiable="confirmModelReleaseViewVisiable" @convertModelTitle="convertModelTitle" :modelItem="convertModel"></ConfirmModelReleaseView>

        </div>
    </div>
</template>
<style>


.mainPage .contenArea .balance {
    margin-bottom: 20px;
}

.mainPage .contenArea .promotion .form-inline > div {
    padding: 2px 20px;
    margin-left: 10px;
}

.mainPage .contenArea .balance .balanceItem {
    margin-right: 22px;
    display: inline;
}

.balanceItem .el-button {
    padding: 3px 15px;
    margin-bottom: 5px;
}


.form-inline > div {
    display: inline;
}


.item {
    margin-top: 15px;
    margin-bottom: 20px;
}


.itemTitle {
    width: 130px;
    text-align: right;
    float: left;
    margin-right: 10px;
}
.el-upload {
    border: 1px solid gainsboro;
    border-radius: 8px;
}

.imgMsg {
    font-size: 11px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .item .is-required::before {
	content: "*";
	color: #f56c6c;
	margin-right: 4px;
}

</style>

<script>


import SecondForm from './formGroup/secondForm.vue'
import ThirdForm from './formGroup/thirdForm.vue'
import FourthForm from './formGroup/fourthForm.vue'
import ConfirmModelTitleView from './../utility/alertView/confirmSaveModel.vue'
import ConfirmModelReleaseView from './../utility/alertView/confirmModelRelease.vue'

import bus from '../../assets/Global.js'
import { GetActivityModelsRelease, ReleaseActivity, GetActivityModels } from "../../../../api/user";
export default {
    data() {
        return {
            editeModel: false,
            confirmModelTitleViewVisiable: false,
            confirmModelReleaseViewVisiable: false,
            activitySigins: ['2','3','4'],
            options: [],
            templateID: {},
            // ----------- 分割线 ---------- //
            checked: false,
            baseFormParms: {
                activityType: this.activityType,
                shopBossID: '',
                productLink: 'https://item.taobao.com/item.htm?spm=a21id.103458.512491.36.2945535dsOpTqK&id=554448390574',
                productTitle: '',
                productName: '',
                mainPicUrl: 'https://gd1.alicdn.com/imgextra/i3/0/TB1Bkqbh4PI8KJjSspfXXcCFXXa_!!0-item_pic.jpg',
                directImgUrl: 'https://gd1.alicdn.com/imgextra/i3/0/TB1Bkqbh4PI8KJjSspfXXcCFXXa_!!0-item_pic.jpg',
                price: '',
                entrance: 1
            },
            activityTypeFormParms: {
                inShopType: 1,
                keywords: [],
                taoCommand: '',
                SKUImg: 'https://gd1.alicdn.com/imgextra/i3/0/TB1Bkqbh4PI8KJjSspfXXcCFXXa_!!0-item_pic.jpg',
                cardConImg: 'https://gd1.alicdn.com/imgextra/i3/0/TB1Bkqbh4PI8KJjSspfXXcCFXXa_!!0-item_pic.jpg',
                weight: [],
                latestTimes: [],
                attentionMsg: '',
                QRCode: '',
                directionalShop: ''
            },
            activityReleaseTimeParms: {
                releaseNum: '',
                releaseDate: '',
                releaseTitle: '',
                payDate: '',
                reward: '',
                presentImgUrl: 'https://gd1.alicdn.com/imgextra/i3/0/TB1Bkqbh4PI8KJjSspfXXcCFXXa_!!0-item_pic.jpg',
                presentContent: '',
                releaseTimes: []
            },
        }
        
    },
    computed: {
        path () {
            return this.$route.path.split('?')[0]
        },

        activityType() {
            return this.path === '/intraday' ? 1 : 2;
        },

        pageTitle() {
            return this.activityType === 1 ? '当天赏金活动' : '回购赏金活动'
        },
        convertModel() {
            var ob = this.baseFormParms;
            ob.presentImgUrl = this.activityReleaseTimeParms.presentImgUrl;
            ob.modelName
            console.log('total: ', ob.price);
            
            return ob;
        },

        activityTitle() {
            return { modelName: this.templateID.label};
        }
        
    },
    components: {
       SecondForm, ThirdForm, FourthForm, ConfirmModelTitleView, ConfirmModelReleaseView
    },
    methods: {
        checkSuccessed() {
            this.checked = false;
        },
        handleChange(val) {
            console.log(val);
        },

        formParmsChange(parms, formIndex) {
            if (formIndex === 1) {
                this.baseFormParms = parms;
            } else if(formIndex === 2)  {
                this.activityTypeFormParms = parms;
            } else {
                this.activityReleaseTimeParms = parms;
            }

            // console.log('哎！！！！！');
            
        },

//      选择模板
        selectModel(value) {
            var title = 
            console.log('select value: ', value);
            GetActivityModels(this.templateID.value, (data) => {
                this.checked = false;
                var currentModel = data.results[0];
                console.log('------fourth------:', currentModel.time_slot);
                this.baseFormParms = {
                    activityType: this.activityType,
                    shopBossID: currentModel.manager,
                    productLink: currentModel.baby_link,
                    productTitle: currentModel.baby_title,
                    productName: currentModel.baby_name,
                    mainPicUrl: currentModel.baby_img,
                    directImgUrl: currentModel.baby_direct_img,
                    price: currentModel.price,
                    entrance: currentModel.inlet.value
                };
                this.activityTypeFormParms = {
                    inShopType: currentModel.inlet_type.value,
                    keywords: currentModel.keyword,
                    taoCommand: currentModel.password,
                    SKUImg: currentModel.sku_img,
                    cardConImg: currentModel.card_img,
                    weight: currentModel.weighting.value,
                    latestTimes: [currentModel.late_time_start.value * 1000, currentModel.late_time_end.value * 1000],
                    attentionMsg: currentModel.account,
                    QRCode: currentModel.qr_code,
                    directionalShop: parseInt(currentModel.orientation_shop)
                };
                
                this.activityReleaseTimeParms = {
                    releaseNum: currentModel.count,
                    releaseDate: currentModel.date.value * 1000,
                    releaseTitle: currentModel.task_title,
                    payDate: currentModel.payment_time * 1000,
                    reward: currentModel.reward,
                    presentImgUrl: currentModel.gift_img,
                    presentContent: currentModel.gift_text,
                    releaseTimes: currentModel.slot_id.text,
                };
                
            }, (error) => {

            });
        },

//      保存、发布、eg，弹出后
        convertModelTitle(title) {
            
            console.log('activityTitle: ', this.activityTitle);
            if ((typeof(title) === 'string' && title.length !== 0) || title === true) {
                console.log('pandian zhengque !!!!!');
                var parms = Object.assign(this.baseFormParms, this.activityTypeFormParms, this.activityReleaseTimeParms);
                parms.modelName = title;
                parms.activityType = this.activityType;
                var saveType;
                if (this.editeModel) {
                    saveType = 3;
                } else {
                    saveType =  this.confirmModelTitleViewVisiable ? 2 : 1;
                    
                }
                parms.activityID = this.templateID.value;
                console.log('parms.activityID: ', parms.activityID);
                ReleaseActivity(parms, saveType, (data) => {
                    // console.log('data:', data);
                    const alertMsg = saveType === 1 ? '发布成功' : '发布并保存成功'; 
                    this.$message.success(alertMsg);
                    this.$router.go(-1);
                }, (error) => {
                    alert(error)
                });
            } 
            this.confirmModelTitleViewVisiable = false;
            this.confirmModelReleaseViewVisiable = false;
        },
    },

//  初始化
    mounted() {
        // this.activityReleaseTimeParms.repurchase = this.activityType === 2;
        
        if (this.$route.params.activityID !== undefined) {
            this.templateID = {
                    value: this.$route.params.activityID,
                    label: this.$route.params.activityTitle
                };
            // this.templateID.value = this.$route.params.activityID;
            // this.templateID.label = this.$route.params.activityTitle;
                console.log('parms.activityID: ', this.templateID.value);
            this.editeModel = true;
            this.selectModel(this.templateID.value);
        }
        
        this.options.length = 0;
        GetActivityModelsRelease(this.activityType, (data) => {
            var results = data.results;
            results.forEach(element => {
                var modelItem = {
                    value: element.id,
                    label: element.model_name
                };
            this.options.push(modelItem);
            });
        })
    },

    updated() {
        console.log('updated activityTitle: ', this.activityTitle);
    }
}
</script>

