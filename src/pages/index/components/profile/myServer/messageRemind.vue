<template>
    <div class="bodyPage">
        <div class="msgServerSelector">
            <div class="item inlineBlock" :class="{active: isActive}" @click="selectMsg(true)">
                <div style="padding:10px 20px">系统消息</div>
            </div>
            <div class="item inlineBlock" :class="{active: !isActive}" @click="selectMsg(false)">
                <div style="padding:10px 20px">商家通知</div>
            </div>
        </div>

        <div class="msgList">
            <ul class="msgUl">
                <template v-if="isActive">
                    <li v-for="(item, index) in systemMsgList" :key="index + 'x'">
                        <mt-cell class="msgCell" title="" :to="{ name: 'singleMsg', params:{'index':index}}">
                            <div class="msgLi">
                                <div class="msgTop clear-float">
                                    <div class="msgTitle fl">{{item.msgTitle}}</div>
                                    <div class="msgDate fr">
                                        {{ item.msgDate }}
                                    </div>
                                </div>
                                <div class="msgContent fl">
                                    <div class="msgActivityId">
                                        活动ID：{{ item.activityID }}
                                    </div>
                                    <div class="msgActivityStatus">
                                        活动状态：{{ item.activityStatus }}
                                    </div>
                                    <div class="msgStatus">
                                        {{ item.msgState }}
                                    </div>
                                </div>

                                <div class="fr" style="margin-top: 20px; margin-right:3px;">
                                    <img src="../../../assets/systemMsg_unread@2x.png" alt="" srcset="" style="width: 50px; height: 50px; border-radius:3px" class="themeBgPurple">
                                </div>
                            </div>
                        
                        </mt-cell>
                    </li>
                </template>
                <template v-else>
                    <li v-for="(item, index) in purchantMsgList" :key="index">
                        <mt-cell class="msgCell" title="" :to="{ name: 'singleMsg', params:{'index':index}}">
                            <div class="msgLi">
                                <div class="msgTop clear-float">
                                    <div class="msgTitle fl">商家通知</div>
                                    <div class="msgDate fr">
                                        {{ item.msgDate }}
                                    </div>
                                </div>
                                <div class="msgContent fl">
                                    <div class="msgActivityId">
                                        {{ item.msgTitle }}
                                    </div>
                                    <div class="msgActivityStatus">
                                        {{ item.msgContent }}
                                    </div>
                                    <div class="msgStatus">
                                        {{ item.msgState }}
                                    </div>
                                </div>

                                <div class="fr" style="margin-top: 20px; margin-right:3px;">
                                    <img src="../../../assets/merchantMsg_unread@2x.png" alt="" srcset="" style="width: 50px; height: 50px; border-radius:3px" class="themeBgPurple">
                                </div>
                            </div>
                        
                        </mt-cell>
                    </li>
                </template>
            </ul>
        </div>
    </div> 
</template>

<script>
export default {
    data() {
        return {
            isActive: true,
            systemMsgList: [
                {msgTitle: "活动状态更新", msgDate: '2018-04-14 18:11', activityID: '123456', activityStatus: '商家已确认，待返款', msgState: '未读', msgImg: 'image'},
                {msgTitle: "活动状态更新", msgDate: '2018-04-14 18:11', activityID: '123456', activityStatus: '商家已确认，待返款', msgState: '未读', msgImg: 'image'},
                {msgTitle: "活动状态更新", msgDate: '2018-04-14 18:11', activityID: '123456', activityStatus: '商家已确认，待返款', msgState: '未读', msgImg: 'image'},
                {msgTitle: "活动状态更新", msgDate: '2018-04-14 18:11', activityID: '123456', activityStatus: '商家已确认，待返款', msgState: '未读', msgImg: 'image'},
                {msgTitle: "活动状态更新", msgDate: '2018-04-14 18:11', activityID: '123456', activityStatus: '商家已确认，待返款', msgState: '未读', msgImg: 'image'},
            ],
            purchantMsgList: [
                {msgTitle: '标题', msgContent: '内容', msgState: '未读'},
                {msgTitle: '标题', msgContent: '内容', msgState: '未读'},
                {msgTitle: '标题', msgContent: '内容', msgState: '未读'},
                {msgTitle: '标题', msgContent: '内容', msgState: '未读'},
            ],
        }
    },

    methods: {
        selectMsg(isFirst) {
            if (isFirst !== this.isActive) {
                this.isActive = !this.isActive;
            }
        }
    }
}
</script>


<style>
    .bodyPage {
        padding-top: 10px;
    }
    .bodyPage .msgServerSelector {
        margin: 0px 13px 10px 13px;
        border: 1px solid rgb(218, 66, 150);
        color: rgb(218, 66, 150);
    }

    .bodyPage .msgList {
        margin: 5px 13px;
    }

    .bodyPage .msgServerSelector .item {
        width: 49.4%;
        text-align: center;
    }

    .msgServerSelector .active {
        background-color: rgb(218, 66, 150);
        color: rgb(254, 255, 255);
    }

    .msgCell {
        margin-bottom: 10px;
        border-radius: 5px;
    }

    .msgCell .mint-cell-title {
        flex: initial;
    }

    .msgCell .mint-cell-value {
        width: 100%;
        color: darkslategrey;
        font-size: 15px;
    }

    .msgCell .msgLi {
        padding: 10px 5px;
        width: 100%;
    }

    .msgCell .msgTop .msgDate {
        font-size: 12px;
        color: gray;
    }

    .msgCell .msgContent {
        margin-top: 10px;
        font-size: 14px;
    }

    .msgCell .msgContent > div {
        line-height: 1.6em;
    }

    .msgCell .msgContent .msgActivityStatus {
        /* color: gray; */
    }

    .msgCell .msgContent .msgStatus {
        font-size: 14px;
        color: gray;
    }


    /* .msgCell .mint-cell-value {
} */

</style>

