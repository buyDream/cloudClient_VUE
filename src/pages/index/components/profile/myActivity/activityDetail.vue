<template>
    <div class="bodyPage">
         <div class="topImg whiteTextColor">
            <!-- <img src="" alt="" srcset=""> -->
            <div class="activityBaseInfo">
                <div class="infoItem">活动ID：123456</div>
                <div class="infoItem">活动类型：当天赏金活动</div>
                <div class="infoItem">活动垫付：108元</div>
                <div class="infoItem whitBorder">端口：手机淘宝</div>
                <div class="infoItem whitBorder">奖励：赠品+10元红包</div>
            </div>
        </div>
        <div class="activityCountDown whiteColor">
            活动倒计时：
        </div>

        <div class="activityFlow whiteColor">
            <div>活动流程</div>
            <div class="activityProgress themePurple">
                <div class="flowItem inline" :class="{activeProgressStep: activityStep === 1}">活动内容</div> >
                <div class="flowItem inline" :class="{activeProgressStep: activityStep === 2}">提交付款信息</div> >
                <div class="flowItem inline" :class="{activeProgressStep: activityStep === 3}">完成</div>
            </div>
            
        </div>

        <div class="whiteColor zy_steps">
            <Steps></Steps>
            
        </div>

    </div>

</template>


<script>

import Steps from '../../littleWidget/steps.vue'
export default {
    data() {
        return {
            activityStep: 1
        }
    },
    components: {
        Steps,
    }
}
</script>


<style scoped>
    .bodyPage .topImg {
        background: cadetblue;
        width: 100%;
        height: 200px;
        margin-bottom: 8px;
    }

    .bodyPage .topImg .infoItem {
        display: inline-block;
        line-height: 1.5em;
        margin: 5px;
    }

    .bodyPage .topImg .activityBaseInfo {
        padding: 10px;
    }

    .whitBorder {
        border: 1px solid rgb(254, 255, 255);
        border-radius: 2px;
        padding-left: 4px;
        padding-right: 4px;
    }

    .bodyPage .activityCountDown {
        /* background-color:  */
        text-align: center;
        padding: 10px 0px;
    }

    .activityFlow {
        margin-top: 10px;
        padding-top: 10px;
        padding-left: 10px;
    }

    .activityFlow .activityProgress {
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
    }

    .activityFlow .activityProgress .activeProgressStep {
        background-color:  rgb(218, 66, 150);
        color: rgb(254, 255, 255);
    }

    .activityFlow .flowItem {
        border: 1px solid rgb(218, 66, 150);
        width: 100px;
        padding: 5px 10px;
        border-radius: 5px;
    }

    .bodyPage .zy_steps {
        padding: 10px;
    }


    

</style>
