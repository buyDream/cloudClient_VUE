<template>
    <div class="tabbarItem">
          <mt-swipe :show-indicators="false">
            <mt-swipe-item class="slide1">1</mt-swipe-item>
            <!-- <mt-swipe-item class="slide2">2</mt-swipe-item>
            <mt-swipe-item class="slide3">3</mt-swipe-item> -->
        </mt-swipe>
        <ul class="homeUL">
            <li>
                <TrumpetNotic></TrumpetNotic>
                
            </li>
            <li v-for="item in 10" :key="item">
                <mt-cell class="music-cell-type3">
                <div class="suffix">
                    <img slot="icon" src="../../assets/profile.png" width="100px" height="100px">
                </div>
                <div class="itemContent">
                    <div class="itemTitle">
                        进口补水面膜2片！抓紧啦！
                    </div>
                    <div class="itemSubtitle">
                        当天赏金活动
                    </div>
                    <div class="itemdivrogress">
                        <div class="zy-progress-content clear-float" style="width:150px">
                            <div class="zy-progress-runway themeBgPurple fl" style="height: 15px; width: 16%">
                                已抢160件
                            </div> 
                            <div class="zy-progress-progress fr" style="height: 15px;">
                            16%
                            </div>
                        </div>

                    </div>
                    <div class="itemRew inlineBlock">
                        奖励：赠品+5元红包
                    </div>
                    <mt-button class="themeBgPurple whiteTextColor" size="small" @click.native="startRush">马上抢 ></mt-button>
                    
                </div>
                
            </mt-cell>
            </li>
        </ul>
       
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import swal from 'sweetalert2'
import MarqueeTips from 'vue-marquee-tips'
import TrumpetNotic from '../littleWidget/trumpetNotic.vue'
export default {
    data() {
        return {
            popupVisible: false,
            buttonBottom: 0,
        }
    },
    
    methods: {
        startRush(value) {
            // swal({ 
            //     title: "抢单成功",
            //     // text: "A custom <span style='color:pink'>html<span> message.",
            //     // html: true,
            //     type: "success",
            // });
            swal({
                title: "抢单成功",
                html:
                    '务必在<span style="color:red">30分钟</span>内完成活动提交付款截图，超时自动放弃；若无法完成，请及时放弃活动',
                showCloseButton: true,
                confirmButtonText:
                    '确认',
                type: "success"
            })
            // swal("抢单成功", "","success");
            
        }
    },

    components: {
    MarqueeTips, TrumpetNotic
  }
}
</script>

<style>

.mint-swipe {
        height: 200px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        /* margin-bottom: 20px; */
      }
      .mint-swipe-item {
        line-height: 340px;
      }
.slide1 {
        background-color: #0089dc;
        color: #fff;
      }
      .slide2 {
        background-color: #ffd705;
        color: #000;
      }
      .slide3 {
        background-color: #ff2d4b;
        color: #fff;
      }

.homeUL {
    margin-top: 8px;
}


.music-cell-type3 p {
    margin: 0px;
}

.music-cell-type3 .mint-cell-value {
    padding: 10px 0px;
}
.music-cell-type3 .mint-cell-title {
    flex: initial;
}

.music-cell-type3 .itemContent {
    padding-left: 10px;
    text-align: left;
}

.music-cell-type3 .itemContent .itemTitle {
    color: black;
    font-size: 18px;
    padding: 5px 0px;
}
.music-cell-type3 .itemContent .itemSubtitle {
    /* color: rgb(216, green, blue) */
    margin-top: 5px;
    font-size: 14px;
}

.music-cell-type3 .itemContent .itemdivrogress {
    margin-top: 20px;
    margin-bottom: 5px;
}

.music-cell-type3 .itemContent .itemRew {
    font-size: 14px;
}

.music-cell-type3 .itemContent button {
    margin-right: 10px;
    position: absolute;
    right: 0px;
    bottom: 10px;
    /* width: 120px; */
}



.zy-progress-content {
    background: rgb(250, 239, 237);
    border: 1px solid rgb(247, 223, 224);
    border-radius: 10px;
    line-height: 20px;
    color:whitesmoke;
    font-size: 13px;
    vertical-align:0px;
}
.zy-progress-content .zy-progress-runway {
    border-radius: 10px;
    /* margin: 0px 10px 0px; */
    padding-left: 5px;
    padding-right: 5px;
}
.zy-progress-content .zy-progress-progress {
    text-align: right;
    padding-right: 5px;
    color: violet;
}

</style>
