<template>
  <div id="app_b">
    <!-- <transition name="slide-left">
            <router-view></router-view>
        </transition> -->
	<transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <keep-alive>
		<router-view class="router-view" ></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import buyer from '../../store/buyer'
export default {
	name: 'App',
	computed:{
      ...mapState({
        direction: state => state.mutations.direction,
      })
	},
	
}
</script>

<style>
#app_b {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  font-size: 14px;
  color: #2c3e50;
}

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 300ms;
    height: 100%;
    top: 0;
    /* position: absolute; */
    backface-visibility: hidden;
    perspective: 1000;
  }
  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  /* .slide-left-enter-active {
	   transition-delay: 0.5s;
  }

  .slide-left-enter-active, .slide-left-leave-active {
        transition: transform .5s;
        transform-origin: left;
    }
    .slide-left-enter, .slide-left-leave-active {
        transform: scale(0,1);
    } */

</style>

