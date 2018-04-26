<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div>
        <div class="form-group col-sm-10">
            <!-- <label class="col-sm-2 control-label">用户名：</label> -->
            <!-- <div class="col-sm-10"> -->
                <input type="text" class="form-control" v-model="username" v-bind:placeholder="placeholder">
            <!-- </div> -->
        </div>
    </div>
</template>

<style>

</style>

<script>
export default {
  props: ['placeholder'],
  data: function () {
    return {
      username: ''
    }
  }
}
</script>
