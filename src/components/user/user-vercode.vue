<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="form-group col-sm-10">
      <!-- <label for="" class="col-sm-2 control-label ">密码：</label> -->
      <!-- <div class="col-sm-10"> -->
          <input type="text"
                 class="form-control col-md-7 d-block"
                 v-model="verificationcode"
                 :placeholder="placeholder">
      <!-- </div> -->
      <!-- <button class="col-md-2 d-block" type="button" @click="sendVerCode">发送验证码</button> -->
  </div>
</template>

<style>

</style>

<script>
export default {
  props: ['placeholder'],
  data: function () {
    return {
      verificationcode: ''
    }
  }
}
</script>
