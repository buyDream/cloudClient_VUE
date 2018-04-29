<template>
  <div class="makeBaseInfo">
      <el-form :model="ruleForm" :rules="rules">
        <el-collapse-item title="2填写活动宝贝基本信息" name="2">
                <el-form-item class="item" prop="name">
                    <div class="itemTitle is-required">
                        核对宝贝链接：
                    </div>
                    <el-input size="media" class="tradeLink" style="width: 35%" placeholder="例如：https://cn.vuejs.org/v2/guide/events.html" v-model="form.productLink"></el-input>
                    <el-button type="danger" @click="checkLink">核对</el-button>
                    <span class="redText">（输入链接后请点击核对按钮，核对成功后才能进行下一步操作）</span>
                </el-form-item>
                <el-form-item class="item">
                        <div class="itemTitle is-required">
                            选择店铺掌柜ID：
                        </div>
                        <el-input :disabled="checked" :value="form.shopBossID" style="width: 180px"></el-input>
                        <span class="redText">（核对链接后自动获取）</span>
                </el-form-item>

                <el-form-item class="item">
                    <!-- <div class="itemTitle is-required">
                        选择进店入口：
                    </div> -->
                    <InShopType title='选择进店入口' parm='inshop' :normalValue="form.entrance" @selected="selected"></InShopType>        
                </el-form-item>

                <el-form-item class="item">
                        <div class="itemTitle is-required">
                            宝贝标题：
                        </div>
                        <el-input placeholder="系统自动获取，无需填写，标题供商家核对，买家无法查看" :disabled="checked" v-model="form.productTitle" style="width: 400px;">
                        </el-input>
                </el-form-item>
                <el-form-item class="item">
                        <div class="itemTitle is-required">
                            宝贝名称：
                        </div>
                    <el-col :span="9">
                        <el-input placeholder="请填写宝贝的描述词语，最长不超过6个字，如：连衣裙、牛仔裤等" :disabled="checked" v-model="form.productName"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item class="item">

                    <div class="inlineBlock uploadImg">
                        <div class="itemTitle is-required ">
                            宝贝主图：
                        </div>
                        <el-upload :disabled="checked" class="avatar-uploader" action="#" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" style="width: 20%; display:inline-block">
                            <img v-if="form.mainPicUrl"  class="avatar" v-lazy="form.mainPicUrl">
                            <i v-else class="el-icon-plus avatar-uploader-icon"><span class="imgMsg">请上传宝贝主图</span></i>
                        </el-upload>
                    </div>

                    <div class="inlineBlock uploadImg">
                        <div class="itemTitle">
                            直通车图：
                        </div>
                        <el-upload :disabled="checked" class="avatar-uploader" action="#" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" style="width: 20%; display:inline-block">
                            <img v-if="form.directImgUrl" :src="form.directImgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"><span class="imgMsg">请上传直通车图</span></i>
                        </el-upload>
                        <div class="warning">
                            <input type="checkbox">
                            直通车活动可上传直通车主图
                        </div>
                    </div>
                </el-form-item>
                <el-form-item class="item">
                    <div class="itemTitle is-required">
                            活动拍下金额：
                    </div>
                    <el-input size="media" class="tradeLink" style="width: 15%" placeholder="例：98" :disabled="checked" v-model="form.price"></el-input>元
                    <span class="redText">(需买家垫付总金额）</span>
                </el-form-item>
        </el-collapse-item>
      </el-form>
  </div>
</template>

<style scoped>

.el-button{
    line-height: 0.3;
    margin-left: 10px;
}
.makeBaseInfo .title {
    /* height: 27px; */
    /* padding-top: 2px; */
    text-align: right;
    /* margin-bottom: 20px; */
}

.item .warning {
    color: red;
    font-size: 10px;
    margin-left: 5px;
    text-align: right;
    margin-right: 13px;
    line-height: 30px;
}

.uploadImg {
    /* height: 240px; */
    float: left;
}


</style>

<script>

import CheckButton from '../../utility/checkButton.vue'
import InShopType from './inShopType.vue'
import { CheckMallLink } from "../../../../../api/user";
export default {
    props: ['checked', 'form', ],
    data() {
        return {
            rules: [],
            ruleForm: null,
        }
    },
    components: {
        CheckButton,InShopType
    },
    methods: {
        handlePictureCardPreview(val) {
            console.log(val);
        },

        handleRemove(val) {
            console.log(val);
        },

        selected(index) {
            this.form.entrance = index + 1;
        },

        checkLink() {
            CheckMallLink(this.form.productLink, (data) => {
                this.$emit('checkSuccessed')
                this.form.shopBossID = data.manager;
                this.form.productTitle = data.title;
                this.form.mainPicUrl = data.pic;
            }, (error) => {

            });
        },
        handleAvatarSuccess(res, file) {
            // 已拦截跨源请求：同源策略禁止读取位于 https://jsonplaceholder.typicode.com/posts/ 的远程资源。（原因：CORS 头缺少 'Access-Control-Allow-Origin'）。
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log('end：', this.imageUrl);
      },
      beforeAvatarUpload(file) {
                console.log('before');
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      uploadError(err, file, fileList) {
          console.log('error: ', err);
          
      }
    },

    updated() {
        this.$emit('formParmsChange', this.form, 1);
    }
  
}
</script>
