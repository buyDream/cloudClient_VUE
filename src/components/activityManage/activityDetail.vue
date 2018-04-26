<template>
    <div class="mainPage">
        <div class="pageTitle">
            活动详情
        </div>
        <div class="contenArea">
            <div class="topInro">
                <div class="topItem" v-if="detailMsg.activityID !== undefined">活动ID：{{detailMsg.activityID}}</div>
                <div class="topItem">活动组ID：{{detailMsg.activityGroupID}}</div>
                <div class="topItem">活动日期：{{detailMsg.releaseDateText}}</div>
            </div>
            <TableView :dataSource="tableData" :activityGroup="activityGroup"></TableView>
      
            <div class="pageTitle">
                    建议要求
            </div>
            <div class="border" >
                <div class="suggestItem">轨迹加权：{{ detailMsg.weight }}</div>
                <div class="suggestItem">
                    特殊说明：{{ detailMsg.attentionMsg }}
                </div>
                
            </div>
        <template v-if="detailType === 2 || detailType === 5">
            <div class="pageTitle">
            活动凭证
            </div>

            <div class="border">
                <div class="imageItem">
                     <img src="https://gd1.alicdn.com/imgextra/i3/0/TB1Bkqbh4PI8KJjSspfXXcCFXXa_!!0-item_pic.jpg" alt="" srcset="" style="width: 250px">
                     <div>
                         订单截图
                     </div>
                </div>
                 <div class="imageItem">
                     <img src="https://gd1.alicdn.com/imgextra/i3/0/TB1Bkqbh4PI8KJjSspfXXcCFXXa_!!0-item_pic.jpg" alt="" srcset="" style="width: 250px">
                     <div>
                         微信收款截图
                     </div>
                </div>
            </div>
        </template>
        

        <template v-if="activityGroup">
            <div class="pageTitle">
            时间分布
            </div>

            <div class="border">
                <div class="distributeTime">
                    <div class="itemTime" v-for="(item, index) in timeBucket" :key="index">
                        <div class="title">{{item.title}}</div>
                        <el-input :disabled="true" type="text" minlength="1" v-model="timeBucket[index]['value']" v-on:input="keyPress(item,index)" :id="'input' + index" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                    </div>
                </div>
            </div>
        </template>

        <template v-if="activityGroup">
            <div class="pageTitle">
            活动组进度
            </div>

        <div class="activityProgress">
            <ProgressTableView :tableData="progressTableData" @changeItemStatus="changeItemStatus" @clickActivityDetail="clickActivityDetail"></ProgressTableView>
        </div>
        </template>
        <template v-if="!activityGroup && detailType === 2">
        <div class="footer">
            <el-button type="success">确认</el-button>
            <el-button type="info">驳回</el-button>
        </div>
        </template>
        </div>
    </div>
</template>

<script>
import TableView from './subCompoents/activityDetailTableView.vue'

import ProgressTableView from './subCompoents/groupActivityProgressTable.vue'
import { ShowActivityModelDetail,GetActivityGroups,GetMyActivity, login } from "../../api/user";
import TimeData from '../../data/timeBucket.json'
export default {
    data() {
        return {
            activityGroup: true,
            tableData: [],
            progressTableData: [],
            detailType: 1,
            detailMsg: {},
            timeBucket: []
        }
    },

    mounted() {
        var params = this.$route.params;
        this.p_loadDetail(params);
        
    },

    updated() {
        console.log('------------');
        
    },


    components: {
        TableView,ProgressTableView
    },

    methods: {
        changeItemStatus() {

        },

        convertTime(timestamp) {
            var date = new Date(timestamp);
            return date.getFullYear() + '-' + (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-' + date.getDate() + ' ';
        },

        clickActivityDetail(val) {
            this.p_loadDetail(val);
        },

        p_groupDetail(params) {
            this.timeBucket = TimeData;
            var val = {activityGroupID: params.activityID};
            console.log('p_groupDetail');
            
            GetActivityGroups(val, (data) => {
                const currentModel = data.results[0];
                this.p_getCommonInfo(currentModel);
                for(var i = 0; i < 24; i++) {
                    var key = 'count_' + i;
                    this.timeBucket[i]['value'] = this.detailMsg.releaseTimes[key];
                }
            }, (failed) => {
                this.$alert(failed);
            });
            

            GetMyActivity(params.activityID, (data) => {
                this.progressTableData.length = 0;
                data.results.forEach(element => {
                    var model = {
                        activityID: element.task_id,
                        orderID: element.bill_id,
                        wechatID: element.wechat,
                        activityDate: element.date,
                        activityStatus: element.task_bill_state,
                    }
                    this.progressTableData.push(model);
                });
            }, (failed) => {
                this.$alert(failed)
            }) 

        },

        p_myActivityDetail(params) {
            const currentAcitvityID = params.activityID;
            if (params.type === '被驳回') {
                this.detailType = 4;
            } else if (params.type.indexOf('已完成') !== -1) {
                this.detailType = 5;
            } else if (params.type.indexOf('待确认') !== -1) {
                this.detailType = 2;
            } else if (params.type.indexOf('待提交') !== -1) {
                this.detailType = 1;
            }

            ShowActivityModelDetail(currentAcitvityID, (data) => {
                const currentModel = data.results[0];
                this.p_getCommonInfo(currentModel);
                
            }, (failed) => {

            });
        },

        p_getCommonInfo(currentModel) {
            var weight = '';
                currentModel.weighting.forEach(element => {
                    if (element === '1') {
                        weight += '收藏宝贝 '; 
                    } else if (element === '2') {
                        weight += '加购物车 ';
                    } else if (element === '3') {
                        weight += '分享二维码 ';
                    } else if (element === '4') {
                        weight += '分享淘口令 ';
                    } else if (element === '5') {
                        weight += '关注店铺 ';
                    } else if (element === '6') {
                        weight += '领优惠券 ';
                    } else {
                        weight += '';
                    }
                });
                
                this.detailMsg = {
                    activityID: currentModel.task_id,
                    activityGroupID: currentModel.id,
                    releaseDateText: currentModel.date,
                    
                    weight: weight,
                    attentionMsg: currentModel.account,
                    releaseTimes: currentModel.time_slot,
                };
                const model = {
                        entrance: currentModel.inlet,
                        shopBossID: currentModel.shop_name,
                        productLink: currentModel.baby_link,
                        keywords: currentModel.keyword,
                        inShopType: currentModel.inlet_type,
                        mainPicUrl: currentModel.baby_img,
                        // latestTimes: this.convertTime(currentModel.late_time_start )+ '-' + this.convertTime(currentModel.late_time_end),
                        latestTimes: currentModel.late_time_start + '-' + currentModel.late_time_end,
                        presentImgUrl: currentModel.gift_img,

                        wechatID: currentModel.wechat,
                        wwID: currentModel.wangwang,
                    
                        activityType: currentModel.type,
                        
                        price: currentModel.price,
                        totalPrice: currentModel.all_price,
                        activityStatus: currentModel.task_bill_state === undefined  ? currentModel.state : currentModel.task_bill_state,

                        
                        productTitle: currentModel.baby_title,
                        productName: currentModel.baby_name,
                        
                        directImgUrl: currentModel.baby_direct_img,

                        taoCommand: currentModel.password,
                        SKUImg: currentModel.sku_img,
                        cardConImg: currentModel.card_img,
    
                        QRCode: currentModel.qr_code,

                        releaseNum: currentModel.count,
                        releaseDate: currentModel.date_time_stamp * 1000,
                        
                        releaseTitle: currentModel.task_title,
                        payDate: currentModel.payment_time,
                        reward: currentModel.reward,
                        
                        presentContent: currentModel.gift_text,
                        
                };
                this.tableData.push(model);

                
        },

        p_loadDetail(params) {
            console.log('params groupID:', params.activityID);
            this.activityGroup = params.isGroup;
            if (this.activityGroup) {
                this.p_groupDetail(params);
            } else { // 我的活动详情
                this.p_myActivityDetail(params);
            }
        }
    },

    


}

// 1，
</script>

<style scoped>

.topInro {
    background: rgb(246, 249, 255);
    text-align: center;
    line-height: 44px;
}

.topInro .topItem {
    margin: 10px 20px;
    display: inline;
}
.border {
    background: rgb(246, 249, 255);
    border: 1px solid rgb(225, 225, 225);
    background: rgb(251, 251, 251);
    margin-top: 12px;
    padding: 10px;
}

.footer {
    margin: 20px 450px;
    padding-bottom: 20px;
}

.suggestItem {
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 15px;
    /* padding-left: 10px; */
}

.contenArea {
    /* width: 250px; */
    padding-left: 10px;
}

.activityProgress {
    margin-top: 15px;
}

.imageItem {
    display: inline-block;
    text-align: center
}

.distributeTime {
    max-width: 994px;
}

.itemTime {
    width: 70px;
    height: 60px;
    display: inline-block;
    text-align: center;
    margin-right: 10px;
}

.el-table tr,
.el-table th,
.cell {
  background-color: transparent !important;
}

</style>

