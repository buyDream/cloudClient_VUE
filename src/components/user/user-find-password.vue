<template>
  <div class="merchant login">
    <div class="login-panel">
      <div class="titlebar">
        <div class="left">
          <label class="logo">共享老客户</label>
          <span class="pass">通行证</span>
        </div>
        <div class="right">
          已有账号，<router-link :to="{name: 'merchant-login'}" class="router-link">马上登录</router-link>
        </div>
      </div>
      <div class="form-wrapper">
        <header class="header">找回密码</header>
        <div class="ui form">
          <div class="inline field">
            <div class="ui input">
              <input type="text" placeholder="用户名(手机号)" v-model="username">
            </div>
          </div>
          <div class="inline field">
            <div class="ui input">
              <input type="password" placeholder="新密码" v-model="password">
            </div>
          </div>
          <div class="inline field">
            <div class="ui input">
              <input type="password" placeholder="确认新密码" v-model="repeat_password">
            </div>
          </div>
          <div class="inline fields verification">
            <div class="inline field input">
              <div class="ui input">
                <input type="text" placeholder="请输入右侧文字验证码" v-model="img_verification_code">
              </div>
            </div>
            <div class="inline field">
                <img src="/api/Rest/VerificationCode/imgcode" class="ui small image" alt="">
            </div>
          </div>
          <div class="inline fields verification">
            <div class="inline field input">
              <div class="ui input">
                <input type="text" placeholder="验证码" v-model="verification_code">
              </div>
            </div>
            <div class="inline field button">
              <button class="ui button primary fluid"  @click="sendVerificationCode" v-show="can_get_verification_code">获取验证码</button>
              <button class="ui button primary fluid disabled"  v-show="!can_get_verification_code">{{ expire_time }}s</button>
            </div>
          </div>
          <div class="inline field">
            <button class="ui orange button fluid" @click="submit">确认</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        username: '',
        password: '',
        repeat_password: '',
        verification_code: '',
        img_verification_code: '',
        can_get_verification_code: true,
        expire_time: 0,
        timer_id: 0,
      }
    },
    computed:{
      username(){
        return this.$store.state.user.username
      }
    },
    methods: {
      submit(){
        this.username = this.username.trim()
        if(this.username.length === 0){
          alertify.alert('请输入用户名（手机号码）')
          return
        }
        this.password = this.password.trim()
        if(this.password.length === 0){
          alertify.alert('请输入密码')
          return
        }
        if(this.repeat_password !== this.password){
          alertify.alert('两次输入的密码不一致')
          return
        }
        this.verification_code = this.verification_code.trim()
        this.img_verification_code = this.img_verification_code.trim()
        if(this.verification_code.length === 0){
          alertify.alert('请输入验证码')
          return
        }
        this.$api.common.findPassword({
          username: this.username,
          type: 'merchant',
          password: this.password,
          verification_code: this.verification_code,
          imgcode: this.img_verification_code
        }, data => {
          alertify.alert('密码重置成功，请重新登录', action => {
            this.$router.push({name: 'merchant-login'})
          })
        })
      },
      sendVerificationCode(){
        if(!this.can_get_verification_code){
          return
        }
        let phone_number = this.username.trim()
        let imgcode = this.img_verification_code.trim()
        if(!phone_number){
          alertify.alert('请输入用户名（手机号码）')
          return
        }
        this.$api.common.sendVerificationCode(phone_number, 'merchant', imgcode, data => {
          if(data['code'] == 2){
            console.log('发送成功')
            alertify.notify('发送成功', 'success', 3, null);
            this.can_get_verification_code = false
            this.expire_time = data.expire
            this.setTimer()
          } else if(data['code'] == -1){
            alertify.notify('之前的验证码还未过期', 'error', 3, null);
          } else if(data['code'] == 4085){
            alertify.notify(data['msg'], 'error', 3, null);
          } else {
            alertify.notify('发送失败，请重试', 'error', 3, null);
          }
        })
      },
      setTimer(){
        this.timer_id = setInterval(() => {
          this.expire_time --
          if(this.expire_time < 0){
            this.can_get_verification_code = true
            clearInterval(this.timer_id)
          }
        }, 1000)
      }
    }
  }
</script>

<style scoped>

</style>