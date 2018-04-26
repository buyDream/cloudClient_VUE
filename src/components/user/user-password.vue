<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="form-group col-sm-10">
      <!-- <label for="" class="col-sm-2 control-label ">密码：</label> -->
      <!-- <div class="col-sm-10"> -->
          <input type="password"
                 class="form-control"
                 v-model="password"
                 :placeholder="placeholder">
      <!-- </div> -->
  </div>
</template>

<style>

</style>

<script>
export default {
  props: ['placeholder'],
  data: function () {
    return {
      password: ''
    }
  }
}
</script>
