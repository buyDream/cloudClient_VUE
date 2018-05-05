<template>
    <!-- <mt-tab-container-item id="tab-container2"> -->
            <ul class="activityItem">
                <li v-for="i in 10" :key="i">
                    <div class="activityItemTop whiteColor">
                        <div class="item inlineBlock">
                            活动ID：456893
                        </div>
                        <div class="item inlineBlock">
                            当天赏金活动
                        </div>
                        <div class="inline themeBlue item fr">
                            已放弃
                        </div>
                    </div>

                    <div class="activityItemContent clear-float">
                        <div class="inlineBlock fl">
                            <img slot="icon" src="../../../assets/profile.png" width="100px" height="100px">
                            <div class="imageTitle">
                                赠品内容
                            </div>
                        </div>

                        <div class="activityDetail inlineBlock ">
                            <template v-for="(item, index) in activityDetail">
                                <div class="activityDetailItem" :key="index">
                                    <span>{{item.title}}：</span> 
                                    <span class="">{{item.value}}</span>
                                </div>
                            </template>
                        </div>

                    </div>

                    <div class="activityItemBottom whiteColor">
                        <template v-if="activityStatus === 1">

                            <!-- <mt-button type="primary" size="small" plain>查看详情</mt-button> -->
                            <mt-button type="primary" size="small" plain>提交付款凭证</mt-button>
                        </template>

                        <template v-else-if="activityStatus === 2">
                            <mt-button size="small" plain class="littleGrayBorder">已完成</mt-button>
                            <mt-button type="primary" size="small" plain>提交付款凭证</mt-button>
                        </template>
                    </div>

                </li>
            </ul>
        <!-- </mt-tab-container-item> -->
</template>

<script>
export default {
    props: ['activityType'],
    data() {
        return {
            activityDetail: [
                    {title: '领取时间',  value: '2018-04-09'},
                    {title: '订单编号',  value: '15532341244'},
                    {title: '奖励',  value: '赠品+10元红包'},
            ],
            activityStatus: 2,
        }
    }
}
</script>

<style>
.activityItem {
      /* background: white; */
      background: rgb(243, 244, 245);
  }

  .activityItem li {
      margin-bottom: 10px;
  }

  .activityItem .activityItemTop .item {
      margin: 15px 10px;
      /* width: 40%; */
      text-align: center;
  }
  

  .activityItem .activityItemContent {
      background-color: rgb(249, 250, 251);
      padding: 10px 20px;
  }

  .activityItem .activityItemContent .imageTitle {
      text-align: center;
  }

  .activityItem .activityItemContent .activityDetail .activityDetailItem {
      margin: 10px 15px;
  }
  
  .activityItem .activityItemBottom {
      text-align: right;
      padding: 5px 0px;
      /* background: white; */
  }

  .activityItem .activityItemBottom button {
      margin-right: 16px;
      border-radius: 18px;
      padding-left: 15px;
      padding-right: 15px;
  }

  .activityItem .activityItemBottom .littleGrayBorder {
      border-color: rgb(190, 191, 192);
  }

</style>

