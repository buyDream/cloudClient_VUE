<template>
    <div class="login">
        <div class="loginPage">

            <div class="loginAD">
                <img src="./../../assets/login_ad.png" alt="" srcset="">
            </div>
            <div class="loginContent">
                <div class="topSelect">
                    <div class="selectItem" :class="{active: isActived}" @click="isActived = !isActived">
                        商家登录
                    </div>|
                    <div class="selectItem" :class="{active: !isActived}" @click="isActived = !isActived">
                        注册
                    </div>
                </div>
                <div class="content">
                    <template v-if="isActived">
                        <div class="inputLine">
                        <el-input v-model="phone" placeholder="请输入手机号码">
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        </div>
                        <div class="inputLine">
                            <el-input v-model="phonecode" placeholder="请输入验证码" style="width: 60%">
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        <el-button type="primary" style="width:38%" @click="getVerificationCode">获取验证码</el-button>
                        </div>
                        <div class="inputLine">
                        <el-input v-model="password" placeholder="请输入密码" type="password">
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        </div>
                        <div class="inputLine">
                            <el-checkbox v-model="checked">我已阅读并且同意<a href="#">《云客户服务协议》</a></el-checkbox>
                        </div>
                        <div class="inputLine">
                            <el-button type="primary" style="width: 100%" @click="onLogin">登录</el-button>
                            <el-button type="text" style="float: right">忘记密码</el-button>
                        </div>
                    </template>
                    <template v-else>
                        <!-- <form action="" v-on:click="register"> -->
                        <div class="inputLine">
                            <el-input v-model="phone" placeholder="请输入手机号码"></el-input>
                        </div>
                        <!-- <div class="inputLine">
                            <el-input v-model="phonecode" placeholder="请输入验证码" style="width: 60%">
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                            <el-button type="primary" style="width:30%">获取验证码</el-button>
                        </div> -->
                        <div class="inputLine">
                            <el-input v-model="phonecode" placeholder="请输入验证码" style="width: 60%"></el-input>
                            <el-button type="primary" style="width:38%" @click="getVerificationCode">获取验证码</el-button></div>
                        <div class="inputLine">
                            <el-input v-model="wechat" placeholder="请输入微信号"></el-input>
                        </div>
                        <div class="inputLine">
                            <el-input v-model="qq" placeholder="请输入QQ号"></el-input>
                        </div>
                        <div class="inputLine">
                            <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
                        </div>
                        <div class="inputLine">
                            <el-input v-model="rpassword" placeholder="请重复输入密码" type="password"></el-input>
                        </div>
                        <div class="inputLine">
                            <el-checkbox v-model="checked">我已阅读并且同意<a href="#">《云客户服务协议》</a></el-checkbox>
                        </div>
                        <div class="inputLine">
                            <el-button type="primary" style="width: 100%" @click="register">注册</el-button>
                        </div>
                        <!-- </form> -->
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.login {
    background-image: url(../../assets/login.png);
    background-position: center;
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
}
.loginPage {
    
    max-width: 1050px;
    margin-bottom: 100px;
}

.loginPage .loginAD {
    /* display: inline-block; */
    float: left;
    margin: 1% 0px;
}

.loginPage .loginContent {
    display: inline-block;
    background: white;
    margin: 5% 0px;
    margin-left: 70px;
}

.topSelect {
    padding-top: 12px;
    border-bottom: 1px solid gainsboro;
}
.selectItem {
    display: inline-block;
    width: 45%;
    text-align: center;
    /* background: rebeccapurple; */
    padding: 20px 0px;
}
.selectItem.active {
    color: dodgerblue;
}

.el-input {
    display: inline-block;
}

.inputLine {
    padding: 10px 10px;
}
</style>

<script>
// import axios from 'axios'
// import './../../assets/'
import { login, GetVertificationCode, StartRegister } from "../../../../api/user";
import Cookies from 'js-cookie';
export default {
    data() {
        return {
            checked: false,
            isActived: true,
            phone: '',
            phonecode: '',
            password: '',
            rpassword: '',
            qq: '',
            wechat: ''
        }
    },

    methods: {
        onLogin() {
            if (this.checked) {
            if(this.phone.length !== 0){
                login(this.phone, this.phonecode, this.password, (data) => {
                    this.setUserData(data);
                    Cookies.set('Admin-Token', data.token);
                    this.setUserData(data);
                    this.$router.push('/home');
                 
                }, (falied) => {
                    this.$message.error(falied);
                });
            }
            } else {
                // alert('你在玩蛇皮吗');
                this.$message.warning("请阅读并同意《云客户服务协议》");
            }
        },
        setUserData (payload) {
            this.$store.commit('setUserData', payload)
        },
        getVerificationCode() {
            if (this.phone.length !== 11) {
                this.$message.error("请输入正确的手机号");
            } else {
                GetVertificationCode(this.phone, (data) => {
                    if (data === 1) {
                        this.$message.success("获取验证码成功");
                    } else {
                        this.$alert("获取验证码失败，请重试！");
                    }
                });
            }
        },
        register() {
            if (this.checked) {
                StartRegister(this.phone, this.phonecode, this.password, this.rpassword, this.wechat, this.qq, (data) => {
                    if (data.state_code == 200) {
                        // alert('ojbk, xiong dei!')
                        this.isActived = true;
                        this.password = '';
                        this.phonecode = '';
                        this.rpassword = '';
                    }
                })
            } else {
                // alert('你在玩蛇皮吗');
                this.$message.warning("请阅读并同意《云客户服务协议》");
            }
            

        }
  
    }
}
</script>
