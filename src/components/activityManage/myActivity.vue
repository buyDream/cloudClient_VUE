<template>
    <div class="mainPage">
        <div class="pageTitle">
            <span style="margin-right: 18px" :class="{actived: isActived}" @click="changeTopItem(true)">我的活动</span>
            <span style="margin-right: 18px" :class="{actived: !isActived}" @click="changeTopItem(false)">我的活动组</span>
        </div>
        <div class="contenArea">
            <div v-if="isActived">
                <Search :index="0" @updateTableView="updateTableView"></Search>

                <div class="tableView">
                <el-radio-group v-model="radioG" @change="handleCheckedStatusChange">
                    <el-radio-button v-for="(item, key) in selections" :label="item.status" :key="key">{{item.title + '（' + item.value + '）'}}</el-radio-button>
                </el-radio-group>
                
                    <TableView :tableData="tableData" @changeItemStatus="changeItemStatus"></TableView>
                </div>
            </div>

            <div v-if="!isActived">
                <Search :index="1" @updateTableView="updateTableView"></Search>
                <div class="tableView">
                    <GroupTableView :tableData="tableGroupData" @changeItemStatus="changeItemStatus"></GroupTableView>
                </div>
            </div>

            <RejectView :rejectVisiable="rejectVisiable" @confirmReject="rejectConfirm" @closeView="closeView"></RejectView>

        </div>
    </div>
</template>

<style scoped>
.actived {
    color: #147ce8;
}

.pageTitle span {
    cursor: pointer;
}

</style>

<script>

import Search from '../searchBar.vue'

import TableView from './subCompoents/activityTableView.vue'
import GroupTableView from './subCompoents/activityTableViewGroup.vue'
import RejectView from '../utility/alertView/rejectView.vue'
import { GetMyActivity,ChangeActivityStatus, GetActivityGroups, StopActivityGroups } from "../../api/user";
// 初始化绑定值不对，是因为radioG，的值并不等于‘全部’
export default {
    data() {
        return {
            isActived: true,
            radioG: '',
            selections: [],
            tableData: [],
            tableGroupData: [],
            parms: {},
            rejectVisiable: false,
            clickedActivityID: '',
        }
    },
    methods: {
        changeTopItem(change) {
            if (this.isActived !== change) {
                this.isActived = !this.isActived;
                if (change) {
                    this.p_myActivityDatas({})
                } else {
                    console.log('p_myActivityGroupsDatas');
                    
                    this.p_myActivityGroupsDatas();
                }
            }
            
        },

//  搜索条件改变
        updateTableView(parms, search) {
            this.parms = Object.assign(parms, this.parms);
            console.log('updateTableView parms: ', parms.activitySearchState);
            if (search) {
                if (this.isActived) {
                    this.p_myActivityDatas(this.parms);
                } else {
                    this.p_myActivityGroupsDatas(parms);        
                }
            }
        },

        handleCheckedStatusChange() {
            console.log('handleCheckedStatusChange: ');
            this.parms.activityStatus = this.radioG;
            console.log('handleCheckedStatusChange parms: ', this.parms);
            this.p_myActivityDatas(this.parms);
        },

// 我的活动
        p_myActivityDatas(parms) {
            this.tableData.length = 0;
            GetMyActivity(parms, (data) => {
                // console.log(data.results);
                this.selections = [
                    {title: '全部', value: data.all_count, status: ''},
                    {title: '待提交', value: data.submit_count, status:1},
                    {title: '待确认', value: data.sure_count, status:2},
                    {title: '已完成 | 待返款', value: data.complete_count, status: 5},
                ];
                var resultsArr = data.results;
                if (resultsArr.length === 0) {
                    this.tableData = [];
                    return;
                }
                resultsArr.forEach(element => {
                    var model = {
                        activityID: element.id,
                        activityGroupID: element.task_id,
                        activityType: element.type,
                        // activityContent: {
                            image: element.baby_img,
                            productLink: element.baby_link,
                            shopName: element.shop_name,
                            keywords: element.keyword.join(),
                            filter: element.late_time_start + '-' + element.late_time_end,
                        // },
                        wwID: element.wangwang,
                        orderID: element.bill_id,
                        activityStatus: element.task_bill_state,
                        activityDate: element.date,
                        inShopType: element.inlet_type,
                        taoCommand: element.password,
                        qrCodeImg: element.qr_code

                    }
                    this.tableData.push(model);
                });
                
            }, (error) => {

            });
            
        },

//    我的活动组
        p_myActivityGroupsDatas(parms) {
            this.tableGroupData.length = 0;
            
            if (parms === undefined) parms = {};
            GetActivityGroups(parms, (data) => {
                var resultsArr = data.results;
                if (resultsArr.length === 0) {
                    this.tableGroupData = [];
                    return;
                }

                resultsArr.forEach(element => {
                    var model = {
                        activityGroupID: element.id,
                        activityType: element.type,
                        image: element.baby_img,
                        productLink: element.baby_link,
                        shopName: element.shop_name,
                        keywords: element.keyword.join(),
                        filter: element.late_time_start + '-' + element.late_time_end,
                        wwID: element.wangwang,
                        orderID: element.bill_id,
                        activityStatus: element.state,
                        activityDate: element.date,
                        totalActivities: element.count,

                        // 接单情况
                        received: element.receive_count,
                        waitGet: element.wait,
                        progressing: element.progress,
                        accomplish: element.complete_count,
                        abandoned: element.abandon_count,

                        presentImgUrl: element.gift_img
                    }
                    this.tableGroupData.push(model);
                });
            }, (error) => {
                alert(error);
            });
        },

        // 操作tableView cell
        changeItemStatus(activityID, confirm) {

            if (this.isActived) {   // 活动
                this.clickedActivityID = activityID;
                if (confirm) { // 确认
                    this.$confirm('最后核实下信息哦？点击“确认”将向买家发送活动完成通知并且安排返款', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        showClose: false
                        }).then(() => {
                            this.p_changeActivityStatus({activityStatus: 1, activityID: this.clickedActivityID})
                        }).catch(() => {
                    });
                } else  // 驳回
                    this.rejectVisiable = true;
            } else {  // 活动组
                
                if (confirm) {
                    this.$confirm('您真的要停止活动组？若活动已经被买家领取则无法停止活动哦~', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        showClose: false
                        }).then(() => {
                            // this.p_changeActivityStatus({activityStatus: 1, activityID: this.clickedActivityID})
                            console.log('f---activityGroupID:', activityID);
                            StopActivityGroups({groupID: activityID}, (data) => {
                                this.p_myActivityGroupsDatas()
                            }, (failed) => {
                                this.$alert(failed)

                            })

                        }).catch(() => {
                            console.log('a---ctivityGroupID:', activityID);
                    });
                }

            }
            
                
            
        },

        // 驳回弹窗按钮
        rejectConfirm(text, index) {
            console.log('botton click', index);
            console.log('botton clickedActivityID', this.clickedActivityID);
            this.rejectVisiable = false;
            if (index === 1) {
                this.p_changeActivityStatus({activityStatus: 2, activityID: this.clickedActivityID, rejectReason: text})
            } 
            
            
        },

        p_changeActivityStatus(parms) {
            ChangeActivityStatus(parms, (data) => {
                this.p_myActivityDatas(this.parms);
            }, (error) => {
                alert(error)
            });
        },
        
        closeView() {
            this.rejectVisiable = false;
        }
        
    
    },
    components: {
        Search, TableView, GroupTableView, RejectView
    },

    updated() {
        console.log('changeValue: ', this.radioG);
    },

    mounted() {
        this.p_myActivityDatas(this.parms);
    }
}
</script>



