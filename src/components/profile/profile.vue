<template>
    <div class="mainPage">
        <div class="pageTitle">
            个人设置
        </div>
        <div class="contenArea">
            <div class="profileItem">
                <div class="profileItemTitle">
                个人信息
                </div>
            </div>
            <div class="profileItemContent">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="用户名">
                        <el-input v-model="formInline.userName" placeholder="用户名" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="formInline.password" placeholder="密码" size="small" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="微信号">
                        <el-input v-model="formInline.wechatID" placeholder="微信号" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="QQ号">
                        <el-input v-model="formInline.qqID" placeholder="QQ号" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="formInline.phone" placeholder="手机号" size="small"></el-input>
                    </el-form-item>
                    <div class="saveButton">
                        <el-button type="primary" @click="onSubmit" plain size="small">保存</el-button>
                    </div>
                </el-form>
                
            </div>

            <div class="profileItem">
                <div class="profileItemTitle">
                    买家设置
                </div>
            </div>
            <div class="profileItemContent">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="每周接单次数限制">
                        <el-input v-model="formInline.weeklyLimit" placeholder="" size="small" style="width: 46px"></el-input>
                            <span style="padding-left: 8px">单</span>
                    </el-form-item>
                    <div class="saveButton">
                        <el-button type="primary" @click="onSubmit" plain size="small">保存</el-button>
                    </div>
                </el-form>
            </div>
            
            <div class="profileItem">
                <div class="profileItemTitle">
                    商家介绍
                </div>
            </div>

            <div class="profileItemContent">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-input
                        type="textarea"
                        placeholder="随便写写"
                        :autosize="{ minRows: 5, maxRows: 9}"
                        v-model="formInline.shopIntro">
                    </el-input>
                    <div class="saveButton">
                        <el-button type="primary" @click="onSubmit" plain size="small">保存</el-button>
                    </div>
                </el-form>
                
            </div>

            <div class="profileItem">
                <div class="profileItemTitle">
                    店铺推广海报：（上传个性海报有利于增加您的老客户粘性哦）
                </div>
            </div>

            <div class="profileItemContent">
                <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :before-upload="beforePosterUpload"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">点击上传750*345像素JPG格式图片</div>
                    <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
            </div>
            
        </div>
    </div>
</template>

<script>

import { GetProfile, ModifyProfile } from "../../api/user";
import thirdFormVue from '../release/formGroup/thirdForm.vue';
export default {
    data() {
      return {
        formInline: {
          userName: '',
          password: '',
          wechatID: '',
          qqID: '',
          phone: '',
          weeklyLimit: '2',
          shopIntro: ''
        },
        
      }
    },
    methods: {
        onSubmit() {
            console.log('save success');
            // this.formInline
            ModifyProfile(this.formInline, (data) => {
                console.log('data: ', data);
                // this.startRequest();
            }, (error) => {

            });
        },
        beforePosterUpload() {
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
//         id	3
// merchant_id	YKH48781523606053
// mobile	13211111111
// password	96e79218965eb72c92a549dd5a330112
// wechat	1
// qq	11
// register_time	1523606053
// late_login_time	1523685966
// level	0
// is_use	1
// invite	null
// token	cdfba9f21cd9488384fe852070b95742b68ac024
// expire_time	1523772366
// username	null
// poster_img	null
// introduce	null
        setValue(data) {
            this.formInline.userName = data.username;
            this.formInline.password = data.password;
            this.formInline.wechatID = data.wechat;
            this.formInline.qqID = data.qq;
            this.formInline.phone = data.mobile;
            // this.formInline.weeklyLimit = data.week_count;
            this.formInline.shopIntro = data.introduce;
            console.log('phone:', data.week_count);
            
        },
        startRequest() {
            GetProfile((data) => {
            this.setValue(data.results);
            console.log(this.formInline);
            
        }, (error) => {
            console.log(error);
        });
        }
    },

    created() {
        console.log('profile created');
    },

    mounted() {
        console.log('profile mounted');
        this.startRequest();
    }
}
</script>

<style scoped>

.profileItem {
    margin: 20px 10px 8px;
    font-size: 15px;
}

.profileItemContent .saveButton {
    display: inline-block;
    position:absolute;
    right:0px; 
    bottom:0px; 
    width:100px; 
    height:60px; 
}
.profileItemContent {
      position: relative;
      padding: 15px 8px;
      background: rgb(246, 247, 251);
}

.profileItemContent .el-form-item {
    margin-bottom: 0px;
}

</style>
