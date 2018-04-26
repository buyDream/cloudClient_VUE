<template>
  <div class="merchant login container">
    <div class="d-block">
      <img src="./../assets/login_ad.png">
    </div>
    <div id="login-input" class="login-panel d-block" style="background:white">
      <!-- <div class="titlebar">
        <div class="left">
          <label class="logo">共享老客户</label>
          <span class="pass">通行证</span>
        </div>
        <div class="right">
          已有账号，<router-link :to="{name: 'merchant-login'}" class="router-link">马上登录</router-link>
        </div>
      </div> -->
      <div class="form-wrapper">
        <header class="header tintcolor">找回密码</header>
        <form class="form-horizontal" role="form">

        <div class="ui form">
          <div class="d-block ">
            <div class="ui input">
                <user-name placeholder="请输入手机号码" ref="username"></user-name>
            </div>
          </div>
          <div class="inline ">
            <user-vercode placeholder="请输入验证码" ref="verificationcode"></user-vercode>
          </div>
          <div class="d-block verification">
            <div class="d-block  input form-group col-sm-10">
              <input class="form-control col-sm-7" type="text" placeholder="请输入验证码" v-model="img_verification_code">
            </div>
            <div class="d-block">
                <!-- <img src="/api/Rest/VerificationCode/imgcode" class="ui small image" alt=""> -->
                nima
            </div>
          </div>
          <div class="inline ">
            <user-password placeholder="请输入密码" ref="userpassword"></user-password>
          </div>
          <div class="inline ">
            <user-password placeholder="请重复输入密码" ref="userpassword"></user-password>
          </div>
          <div class="d-block col-sm-offset-2 form-group col-sm-10">
            <button class="btn btn-block tint-bg-color" @click="submit">确认</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import usernameinput from "./user/user-name.vue";
import usersubmit from "./user/user-submit.vue";
import userpassword from "./user/user-password.vue";
import uservercode from "./user/user-vercode.vue";
export default {
  data() {
    return {
      username: "",
      password: "",
      repeat_password: "",
      verification_code: "",
      img_verification_code: "",
      can_get_verification_code: true,
      expire_time: 0,
      timer_id: 0
    };
  },
  components: {
    "user-name": usernameinput,
    "user-submit": usersubmit,
    "user-password": userpassword,
    "user-vercode": uservercode
  },
  computed: {
    username() {
      return this.$store.state.user.username;
    }
  },
  methods: {
    submit() {
      this.username = this.username.trim();
      if (this.username.length === 0) {
        alertify.alert("请输入用户名（手机号码）");
        return;
      }
      this.password = this.password.trim();
      if (this.password.length === 0) {
        alertify.alert("请输入密码");
        return;
      }
      if (this.repeat_password !== this.password) {
        alertify.alert("两次输入的密码不一致");
        return;
      }
      this.verification_code = this.verification_code.trim();
      this.img_verification_code = this.img_verification_code.trim();
      if (this.verification_code.length === 0) {
        alertify.alert("请输入验证码");
        return;
      }
      this.$api.common.findPassword(
        {
          username: this.username,
          type: "merchant",
          password: this.password,
          verification_code: this.verification_code,
          imgcode: this.img_verification_code
        },
        data => {
          alertify.alert("密码重置成功，请重新登录", action => {
            this.$router.push({ name: "merchant-login" });
          });
        }
      );
    },
    sendVerificationCode() {
      if (!this.can_get_verification_code) {
        return;
      }
      let phone_number = this.username.trim();
      let imgcode = this.img_verification_code.trim();
      if (!phone_number) {
        alertify.alert("请输入用户名（手机号码）");
        return;
      }
      this.$api.common.sendVerificationCode(
        phone_number,
        "merchant",
        imgcode,
        data => {
          if (data["code"] == 2) {
            console.log("发送成功");
            alertify.notify("发送成功", "success", 3, null);
            this.can_get_verification_code = false;
            this.expire_time = data.expire;
            this.setTimer();
          } else if (data["code"] == -1) {
            alertify.notify("之前的验证码还未过期", "error", 3, null);
          } else if (data["code"] == 4085) {
            alertify.notify(data["msg"], "error", 3, null);
          } else {
            alertify.notify("发送失败，请重试", "error", 3, null);
          }
        }
      );
    },
    setTimer() {
      this.timer_id = setInterval(() => {
        this.expire_time--;
        if (this.expire_time < 0) {
          this.can_get_verification_code = true;
          clearInterval(this.timer_id);
        }
      }, 1000);
    }
  }
};
</script>

<style>
/* img {
  float: left;
  width: 50%;
  max-width: 300px;
}
#login-input {
  float: right;
  background: white;
  max-width: 400px;
  width: 50%;
} */
</style>