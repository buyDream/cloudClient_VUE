<template>
    <!-- <div class="container"> -->
        <div class="row">
            <side-nav-bar></side-nav-bar>
            <div class="content col-sm-10">
                <div class="top-nav">
                    <div class="clear-float">
                    <div class="fl">
                        <a class="item" href="#">森林，欢迎您！</a>
                    </div>
                    <div class="fr">
                        <a class="item" href="#">首页</a>
                        <a class="item" href="#">在线客服</a>
                        <a class="item" href="#">退出</a>
                    </div>
                </div>
                </div>
                <div class="mainPage clear-float">
                    <div class="pageTitle tintcolor">
                        | 发布活动
                    </div>
                    <div class="centenArea">
                    <div class="balance-item">
                        可用余额：<span class="balance">999.95</span> 账户余额：<span>99.95</span> 冻结余额：<span>0</span> <button class="btn">充钱</button>
                        <div class="notice-msg">
                            注意：活动金额是指发布任务过程需预付冻结金额，方便商家核对活动资金问题
                        </div>
                    </div>

                    <div class="promotion">
                        <div class="form-inline">
                            <div class="normalPro tint-bg-color">普通活动</div>
                            <div class="outPro tint-bg-color">推广活动</div>
                        </div>
                     <div id="accordion">
                    <div class="card">
                    <div class="card-header">
                        <a class="card-link" data-toggle="collapse" href="#collapseOne">
                        *推广活动中的人群画像
                        </a>
                    </div>
                    <div id="collapseOne" class="collapse show">
                        <div class="card-block">
                            <div class="gender">
                                性别：
                                <input checked="true" type="radio" name="gender" class="addLittleMargin" value="nomatter" v-model="gender">不限
                                <input type="radio" name="gender" class="addLittleMargin" value="male" v-model="gender">男
                                <input type="radio" name="gender" class="addLittleMargin" value="female" v-model="gender">女
                            </div>

                            <div class="age">
                                <checkButton title="年龄" parm="age"></checkButton>
                            </div>
                            <div class="taoqivalue">
                                <checkButton title="淘气值" parm="taoqovalue"></checkButton>
                            </div>
                            <div class="taoqivalue">
                                <checkButton title="地区" parm="taoqovalue"></checkButton>
                            </div>
                            <div class="taoqivalue">
                                <checkButton title="职业" parm="taoqovalue"></checkButton>
                            </div>
                            <div class="taoqivalue">
                                <checkButton title="支付偏好" parm="taoqovalue"></checkButton>
                            </div>
                            <div class="taoqivalue">
                                <checkButton title="优惠偏好" parm="taoqovalue"></checkButton>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="card">
                    <div class="card-header">
                        <a class="collapsed card-link" data-toggle="collapse" href="#collapseTwo">
                        是否选择模板
                    </a>
                    </div>
                    <div id="collapseTwo" class="collapse show">
                        <div class="card-block">
                            <div class="selected">
                            <span class="selectModel no">
                                否，我要创建
                            </span>
                            <span class="selectModel sure">
                                是
                            </span>
                            <span>以保存的模板不能编辑，如需编辑请新建模板</span>
                            </div>
                            <div class="model">
                                /////
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="card">
                    <div class="card-header">
                        <a class="collapsed card-link" data-toggle="collapse" href="#collapseThree">
                        填写活动宝贝基本信息
                        </a>
                    </div>
                    <div id="collapseThree" class="collapse show">
                        <div class="card-block">
                            <div class="baseMessageTitle">核对宝贝链接：</div>
                            <div class="baseMessageTitle">选择店铺掌柜ID：</div>
                            <div class="baseMessageTitle">选择进店入口：</div>
                            <div class="baseMessageTitle">选择类目：</div>
                            <div class="baseMessageTitle">宝贝标题：</div>
                            <div class="baseMessageTitle">宝贝名称：</div>
                            <div class="baseMessageTitle">宝贝主图：</div>
                        </div>
                    </div>
                    </div>
                     <div class="card">
                    <div class="card-header">
                        <a class="collapsed card-link" data-toggle="collapse" href="#collapseFour">
                        请选择活动类型
                        </a>
                    </div>
                    <div id="collapseFour" class="collapse show">
                        <div class="card-block">
                            <div class="baseMessageTitle">活动类型：</div>
                            <div class="baseMessageTitle">选择进店方式：</div>
                            <div class="baseMessageTitle">关键词：</div>
                            <div class="baseMessageTitle">上传SKU截图：</div>
                            <div class="baseMessageTitle">上传条件截图：</div>
                            <div class="baseMessageTitle">选择活动需求：</div>
                            <div class="baseMessageTitle">是否旺旺咨询：</div>
                            <div class="baseMessageTitle">旺旺聊天内容：</div>
                            <div class="baseMessageTitle">定向时间：</div>
                            <div class="baseMessageTitle">定向店铺：</div>
                            <div class="baseMessageTitle">选择加权任务：</div>
                        </div>
                    </div>
                    </div>
                     <div class="card">
                    <div class="card-header">
                        <a class="collapsed card-link" data-toggle="collapse" href="#collapseFive">
                        请选择发布时间、数量和奖励
                        </a>
                    </div>
                    <div id="collapseFive" class="collapse show">
                        <div class="card-block">
                            <div class="baseMessageTitle">发布数量：</div>
                            <div class="baseMessageTitle">发布日期：</div>
                            <div class="baseMessageTitle">奖励买家</div>
                            <div class="baseMessageTitle">剩余发布数量：</div>

                        </div>
                    </div>
                    </div>
                </div>
                        
                    </div>

                    </div>
                </div>
            </div>
        </div>
    <!-- </div> -->
</template>

<style>
html body {
    background: rgb(240, 246, 246);
}

.top-nav  {
  background: white;
}

.top-nav .item {
  display: inline-block;
  padding: 6px 10px;
  color: #666;
}

.top-nav .item:hover {
  color: #333;
}

div .content {
    /* background: violet; */
    padding-left: 0;
    /* margin-top: 20px; */
}

/* .router-link-active {
    color: red;
} */

.content .item {
    margin-top: 0;
}

.content .mainPage {
    margin-top: 20px;
    /* padding-top: 20px; */
    background:white;
    text-align: left;
}
.content .mainPage .notice-msg {
    color: red;
    font-size: 14px;
}
.content .mainPage .centenArea {
    padding: 15px;
}
.pageTitle {
    border-bottom: 1px solid rgb(228, 229, 230);
    padding-left: 10px;
}

.balance-item {
    margin-bottom: 25px;
}

.promotion .form-inline > * {
    margin-left: 18px;
    padding-left: 15px;
    padding-right: 15px;
    color: white;
}

.promotion .form-inline {
    border-bottom: 2px solid orange;
    margin-bottom: 12px;
}
#accordion .card .card-link {
    color: black;
}

.checkButton {
    background: white;
    border: 1px solid orange;
    font-size: 12px;
}
#accordion .card .collapse {
    margin-left: 20px;
}
.item {
    /* margin-top: 15px; */
    padding-top: 8px;
    padding-bottom: 8px;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.addLittleMargin {
    margin-left: 25px;
    margin-right: 5px;
}
</style>


<script>
import checkButton from './utility/checkButton.vue'
import sideNavBar from './sideNavBar.vue'

// import ages from '@./../config/age.json'
export default {
  name: 'homePage',
  components: {
       checkButton, sideNavBar
  },
  data: function() {
      return {
        gender: '男'
      }
  }
}
</script>

