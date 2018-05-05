<template>
    <div class="bodyPage">
        <div class="topImg">
            <!-- <img src="" alt="" srcset=""> -->
        </div>
        <TrumpetNotic></TrumpetNotic>
        <div class="activityIntro whiteColor">
            <h3 class="borderGrayColor">活动介绍</h3>
            <!-- <hr> -->
            <ul class="hasDisc">
                <li class="introItem"><span class="themePurple">当天赏金活动：</span>在本帖发布悬赏，以及解答悬赏的赏金，全部由活动社承担。咸鱼们只需按要求，若超过当日，视为恶意发帖，取消j奖励并扣罚积分。恶意...</li>
                <li class="introItem"><span class="themePurple">回购赏金活动：</span>在本帖发布悬赏，以及解答悬赏的赏金，全部由活动社承担。咸鱼们只需按要求，若超过当日，视为恶意发帖，取消j奖励并扣罚积分。恶意...</li>

            </ul>
            <!-- <div class="introItem">
                <span class="themePurple">当天赏金活动：</span>在本帖发布悬赏，以及解答悬赏的赏金，全部由活动社承担。咸鱼们只需按要求，若超过当日，视为恶意发帖，取消j奖励并扣罚积分。恶意...
            </div>
            <div class="introItem">
                <span class="themePurple">回购赏金活动：</span>在本帖发布悬赏，以及解答悬赏的赏金，全部由活动社承担。咸鱼们只需按要求，若超过当日，视为恶意发帖，取消j奖励并扣罚积分。恶意...
            </div> -->
        </div>

        <div class="newRead whiteColor">
            <h3 class="borderGrayColor">新人必读专区</h3>
            <div class="newReadTitle">
                相信您刚加入我们的老客户福利区，肯定会有很多疑惑。不妨一起来阅读以下内容：
            </div>
            <ul>
                <li v-for="(item, index) in newCommerArr" :key="index" class="borderGrayColor"><span class="themePurple">{{index+1}}、</span>{{item}}</li>
            </ul>
        </div>
    </div>

</template>

<script>

import TrumpetNotic from '../littleWidget/trumpetNotic.vue'
export default {
    data() {
        return {
            newCommerArr: [
                '关于新人如何领取活动',
                '关于活动完成后返款问题',
                '关于新人如何领取活动',
                '关于活动完成后返款问题',
            ]
        }
    },
    
    components: {
        TrumpetNotic
    }
}
</script>

<style scoped>
    .bodyPage .topImg {
        background: cadetblue;
        width: 100%;
        height: 100px;
        margin-bottom: 8px;
    }

    .activityIntro {
        text-align: center;
        /* padding-top: 5px; */
    }
    h3 {
        padding: 10px;
        border-bottom: 1px solid;
    }

    .activityIntro .introItem {
        text-align: left;
        padding: 5px 8px;
        line-height: 1.6em;
    }

    .activityIntro .hasDisc li {
        list-style: disc;
        
    }

    .newRead {
        text-align: center;
    }

    .newRead .newReadTitle {
        padding: 5px 30px 10px 30px;
        line-height: 1.6em;
    }

    .newRead ul li {
        line-height: 1.5em;
        text-align: left;
        margin-left: 10px;
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid;
    }
</style>


