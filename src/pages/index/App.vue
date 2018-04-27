<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
        <router-view/>
    <simplert ref="simplert"></simplert>
  </div>
</template>

<script>
import simplert from "vue2-simplert";
export default {
    name: 'app',
    components: {
      simplert
    },
    data: function () {
      return { buttonItems: [
            {
                text: 'one',
                value: 'A'
            },
            {
                text: 'two',
                value: 'B'
            },
            {
                text: 'three',
                value: 'C'
            },
        ],
      }
    },
    mounted () {
      window.simplert = this.$refs.simplert
      window.simplertError = function (msg, callback) {
        window.simplert.openSimplert({
          type: 'error',
          message: msg,
          customCloseBtnText: '关闭',
          onClose: callback
        })
      }
      window.simplertSuccess = function (msg, callback) {
        window.simplert.openSimplert({
          type: 'success',
          message: msg,
          customCloseBtnText: '关闭',
          onClose: callback
        })
      }
      window.simplertWarning = function (msg, callback) {
        window.simplert.openSimplert({
          type: 'warning',
          message: msg,
          customCloseBtnText: '关闭',
          onClose: callback
        })
      }
      window.simplertInfo = function (msg, callback) {
        window.simplert.openSimplert({
          type: 'info',
          message: msg,
          customCloseBtnText: '关闭',
          onClose: callback
        })
      }
    }
  }
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}
</style>
