<template>
  <div id="app" class="container">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">

      <router-view class="content" name="content"></router-view>
      <router-view></router-view>

    </transition>

    <router-view class="footer" name="footer"></router-view>
    <!-- <vfooter></vfooter> -->

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  // components: {
  //   'vfooter': MainFooter
  // }
  computed: {
    ...mapState({
      direction: state => state.mutations.direction
    })
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 0.3s;
  height: 100%;
  top: 0;
  bottom: 0;
  position: absolute;
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
</style>

<style lang="scss">
@import "lib/reset.scss";
@import "@/assets/scss/px2rem.scss";

$footer-height: px2rem(48);

html,
body,
.container {
  width:100%;
  min-height: 100%;
}
.container {
  @include flexbox();
  @include flex-direction(column);
  .content {
    @include rect(100%, 100%);
    margin-bottom: $footer-height;
    overflow-y: auto;
  }
  .footer {
    @include rect(100%, $footer-height);
    z-index: 999;
    position: fixed;
    bottom: 0;
    @include background-color(#fff);
    border: 1px solid #ccc;
    ul {
      @include rect(100%, 100%);
    }
  }
}
</style>
