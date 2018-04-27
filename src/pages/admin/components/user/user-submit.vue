<template xmlns:v-bind="http://www.w3.org/1999/xhtml">

<div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
        <button type="button" class="btn btn-block tint-bg-color" @click="test">{{buttonText}}</button>
    </div>
</div>
</template>

<style>

</style>
<script>
export default {
  props: ['buttonText'],
  methods: {
    test () {
      alert('你输入的用户名为：' +
          this.$parent.$refs.username.$data.username +
          '\n' +
          '你输入的密码为：' +
          this.$parent.$refs.userpassword.$data.password
      )
      console.log('mmp')
    }
  }
}
</script>
